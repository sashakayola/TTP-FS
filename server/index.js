const path = require('path')
const express = require('express')
const morgan = require('morgan') // logging middleware
const db = require('./db')
const PORT = process.env.PORT || 8080
const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', require('./api'))
app.use(express.static(path.join(__dirname, '../public')))


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'server error')
})

module.exports = app

db.sync()
  .then(() => {
    console.log('db is synced')
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
})
