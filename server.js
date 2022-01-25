var express = require('express')
let app = express()
let cors = require('cors')
let bodyParser = require('body-parser')
let mongoose = require('mongoose')
let dotenv = require('dotenv')
let handlers = require('./handlers')

app.use([cors(),bodyParser.urlencoded({extended:false})])

app.use("/public",express.static("./public"))

app.use("/resources",express.static("./resources"))

app.post("/api/users",handlers.create_user)

app.get("/api/users",handlers.getAllRecords)

app.post("/api/users/:_id/exercises",handlers.addExercise)

app.get("/api/users/:_id/logs",handlers.findLog)

app.get("/",handlers.getHomepage)

app.listen(3000,()=>{
    console.log("Server listening on port 3000...")
})