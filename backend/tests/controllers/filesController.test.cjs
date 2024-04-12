const chai = require('chai')
const chaiHttp = require('chai-http')
const { expect } = chai
const app = require('../../index.cjs')

chai.use(chaiHttp)

describe('Files Controller', () => {
  describe('GET /files/data', () => {
    it('should return an array of files data', (done) => {
      chai.request(app)
        .get('/files/data')
        .end((_, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')
          expect(res.body).to.have.length.above(0)
          expect(res.body[0]).to.have.property('file')
          expect(res.body[0]).to.have.property('lines')
          done()
        })
    })
  })
  describe('GET /files/list', () => {
    it('should return an array of file names', (done) => {
      chai.request(app)
        .get('/files/list')
        .end((_, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body.files).to.have.length.above(0)

          done()
        })
    })
  })
})
