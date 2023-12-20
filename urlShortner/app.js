const express = require('express')
const router = require('./routes/urlRoutes')
const connectDb = require('./connection')
const logReqRes = require('./middlewares/logs')

const PORT = 8001
const app = express();
const logfile = 'logs.log'
const url = "mongodb://localhost:27017/short-url"

connectDb(url).then(()=> { console.log('MongoDB connected  :)'); })

app.use(express.urlencoded({ extended: false }))
app.use(logReqRes(logfile))

app.use('/url', router)

app.listen(PORT, () => { console.log(`Server started at PORT: ${PORT}  :) `);})