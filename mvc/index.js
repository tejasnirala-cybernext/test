const express = require('express')
const connectDb = require('./connection')
const logReqRes = require('./middlewares/logs')
const router = require('./routes/users')

const PORT = 8000
const app = express()
const url = "mongodb://127.0.0.1:27017/nodejs";

// DataBase Connection
connectDb(url).then(() => { console.log("MongoDB Connect"); })

// Middlewares
app.use(express.urlencoded({ extended: false }))
app.use(logReqRes('logs.log'))

// Router
app.use('/api/users', router)

app.listen(PORT, () => { console.log(`Server Created on PORT: ${PORT}`);})