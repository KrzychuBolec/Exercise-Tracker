require("express");
let database = require("./database");

let create_user = (req, res) => {
  let username = req.body.username;
  let payload = { username: username };
  database.createUser(payload,res)
};

let getHomepage = (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
};

let getAllRecords = (req,res,done) => {
    database.findAll(done,res)
}

let addExercise =(req,res,done)=>{
    console.log(req.params)
    let userdata = {ID: req.params._id, description: req.body.description, duration: req.body.duration, date: req.body.date}
    console.log(userdata)
    database.addExercises(userdata,res,done)
}

let findLog = (req,res)=>{
    let ID = req.params._id
    database.findAndReturnLogs(ID,req,res)
}

module.exports = {
  create_user,
  getHomepage,
  getAllRecords,
  addExercise,
  findLog
};
