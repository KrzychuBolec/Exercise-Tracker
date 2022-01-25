require("dotenv").config();

var mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const personSchema = new mongoose.Schema({
  username: String,
  count: Number,
  log: [
    {
      description: String,
      duration: Number,
      date: String,
    },
  ],
});

const Person = mongoose.model("Person", personSchema);

const createUser = (userData, res) => {
  var user = new Person(userData);
  user.save((err, data) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(data);
      res.send({ username: data.username, _id: data._id });
    }
  });
};

const findAll = (done, res) => {
  Person.find({}, { username: 1, _id: 1 }, (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data);
    res.send(data);
    done(null, data);
  });
};

const addExercises = (userData, res, done) => {
  let exDate = null;

  if (userData.date) {
    exDate = new Date(userData.date).toDateString();
  } else {
    exDate = new Date().toDateString();
  }

  Person.findOneAndUpdate(
    { _id: userData.ID },
    {
      $push: {
        log: {
          description: userData.description,
          duration: userData.duration,
          date: exDate,
        },
      },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log(err);
      } else {
        console.log(doc);
        res.send({
          username: doc.username,
          description: userData.description,
          duration: parseInt(userData.duration),
          date: exDate,
          _id: doc._id,
        });
      }
    }
  );
};

const findAndReturnLogs = (id,req,res) =>{
    let limitNum = (req.query.limit == undefined)? 0: req.query.limit
    let from = req.query.from
    let to = req.query.to

    Person.findById(id,null,{log:{$slice: limit}},(err, doc)=>{
        if(err){
            console.log(err)
            res.send(err)
        }else{
            res.send({
                username: doc.username,
                count: doc.log.length +1,
                _id: doc._id,
                log: doc.log
            })
        }
    })
}


module.exports = {
  createUser,
  findAll,
  addExercises,
  findAndReturnLogs
};
