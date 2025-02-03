const cors=require('cors')
const express=require('express')
const bodyParser = require('body-parser')
const app=express()
const port = 3000

const db = require('./queries')

app.use(cors())

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/messages', db.getMessages)

app.post('/trimite', db.sendMessage)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js' })
})



app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
