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
    let userdata = req.body
    database.addExercises(userdata,res,done)
}

module.exports = {
  create_user,
  getHomepage,
  getAllRecords,
  addExercise
};
