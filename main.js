import express from 'express'
import https from 'https'
import fs from 'fs'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
dotenv.config({path: '.env'})

import { router as WOLrouter } from './routes/WOLroute.js'

const app = express()
const httpPort = process.env.HTTPPORT
const httpsPort = process.env.HTTPSPORT
const keypath = "./data/certs/thimodehaankey.pem"
const certpath = "./data/certs/thimodehaan.pem"

let options

if (fs.existsSync(keypath) || fs.existsSync(certpath)) {
  options = {
    key: fs.readFileSync(keypath),
    cert: fs.readFileSync(certpath),
    passphrase: process.env.PHASSPHRASE
  }
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")

    next()
})
app.use('/WOL', WOLrouter)


app.listen(httpPort, () => {
  console.log(`Http listening on port ${httpPort}`)
})

if (options !== undefined) {
  https.createServer(options, app).listen(httpsPort, () => {
    console.log(`Https listening on port ${httpsPort}`)
  })
}