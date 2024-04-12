const express = require('express')
const app = express()
const filesController = require('./controllers/filesController.cjs')

const PORT = 3001

app.use(express.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.get('/files/data', filesController.getFilesData)
app.get('/files/list', filesController.getFilesList)

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})

module.exports = app
