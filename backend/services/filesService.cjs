const https = require('https')

const httpRequest = async (url, options) => {
  return new Promise((resolve, reject) => {
    https.get(url, options, (res) => {
      let data = ''
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('end', () => {
        resolve(data)
      })
    }).on('error', (err) => {
      reject(err)
    })
  })
}

const correctFiles = async (fileList) => {
  const list = await Promise.all(
    fileList.map(async (fileName) => {
      try {
        const fileResponse = await httpRequest(`https://echo-serv.tbxnet.com/v1/secret/file/${fileName}`, {
          headers: {
            Authorization: 'Bearer aSuperSecretKey'
          }
        })
        const lines = fileResponse.split('\n').map((line) => {
          const [file, text, number, hex] = line.split(',')
          if (file && text && !isNaN(number) && hex?.match(/^[0-9A-Fa-f]{32}$/)) {
            return { text, number: parseInt(number), hex }
          }
          return null
        }).filter(Boolean)
        return { file: fileName, lines }
      } catch (error) {
        console.error(`Error al obtener datos del archivo ${fileName}:`, error.message)
        return null
      }
    })
  )
  return list
}

exports.getFiles = async (req) => {
  try {
    const { fileName } = req.query
    let fileList = []
    if (fileName) {
      fileList = [fileName]
    } else {
      const fileListResponse = await httpRequest('https://echo-serv.tbxnet.com/v1/secret/files',
        {
          headers: {
            Authorization: 'Bearer aSuperSecretKey'
          }
        })
      fileList = JSON.parse(fileListResponse).files
    }

    const filesData = await correctFiles(fileList)

    const validFilesData = filesData.filter((fileData) => fileData !== null && fileData.lines.length > 0)
    return validFilesData
  } catch (err) {
    console.log(err)
  }
}

exports.getList = async () => {
  let fileList = []
  const fileListResponse = await httpRequest('https://echo-serv.tbxnet.com/v1/secret/files',
    {
      headers: {
        Authorization: 'Bearer aSuperSecretKey'
      }
    })
  fileList = JSON.parse(fileListResponse).files

  const filesData = await correctFiles(fileList)

  const validFilesDataName = filesData.reduce((acc, fileData) => {
    if (fileData && fileData.lines.length > 0) {
      acc.push(fileData.file);
    }
    return acc;
  }, []);

  return validFilesDataName
}
