const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 5000
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');

var cors = require('cors')

app.use(cors())
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
app.use('/posts', postRoutes)
app.use('/', authRoutes)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
