var express = require('express')
let app = express()
let cors = require('cors')
let bodyParser = require('body-parser')
let mongoose = require('mongoose')
let dotenv = require('dotenv')

app.use([cors(),bodyParser.urlencoded({extended:false})])
