const { getFiles, getList } = require('../services/filesService.cjs')

exports.getFilesData = async (req, res) => {
  try {
    const filesData = await getFiles(req)
    res.json(filesData)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

exports.getFilesList = async (req, res) => {
  try {
    const listData = await getList()
    res.json(listData)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
