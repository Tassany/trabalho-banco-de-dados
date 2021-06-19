const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const userRoutes = require('./routes/userRoutes');

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.use('/users', userRoutes)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
