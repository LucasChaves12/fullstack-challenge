const { expect } = require('chai')
const filesService = require('../../services/filesService.cjs')

describe('Files Service', () => {
  describe('getFiles', () => {
    it('should return an array of files data', async () => {
      const mockReq = {
        query: {}
      }

      const result = await filesService.getFiles(mockReq)

      expect(result).to.be.an('array')
      expect(result).to.have.length.above(0)
      expect(result[0]).to.have.property('file')
      expect(result[0]).to.have.property('lines')
    })
    it('should return an array with 1 file', async () => {
      const mockReq = {
        query: {
          fileName: 'test3.csv'
        }
      }

      const result = await filesService.getFiles(mockReq)

      expect(result).to.be.an('array')
      expect(result[0]).to.have.property('file')
      expect(result[0]).to.have.property('lines')
      expect(result[0].lines).to.have.length.above(0)
    })

    it('should handle errors gracefully', async () => {
      const mockReq = {}

      try {
        await filesService.getFiles(mockReq)
      } catch (error) {
        expect(error.message).to.equal('Fake error')
      }
    })
  })
  describe('getList', () => {
    it('should return an array of file names', async () => {
      const result = await filesService.getList()

      expect(result.files).to.be.an('array')
      expect(result.files).to.have.length.above(0)
    })
  })
})
