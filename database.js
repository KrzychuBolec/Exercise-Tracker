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

const findAndReturnLogs = (id, req, res) => {
  if (req.query.limit != undefined) {
    Person.findById(
      id,
      { log: { $slice: parseInt(req.query.limit) } },
      null,
      (err, doc) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          console.log(doc);
          res.send({
            username: doc.username,
            count: doc.log.length,
            _id: doc._id,
            log: doc.log,
          });
        }
      }
    );
  } else {
    let from =
      req.query.from != undefined
        ? new Date(req.query.from)
        : new Date(0, 0, 0);
    let to = req.query.to != undefined ? new Date(req.query.to) : new Date();

    let username;
    let _id;
    let log;

    Person.findById(id, null, null, (err, doc) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        username = doc.username;
        _id = doc._id;
        console.log(doc.log);
        log = doc.log.filter((item) => {
          if (new Date(item.date) > from && new Date(item.date) < to) {
            return true;
          } else {
            return false;
          }
        });

        res.send({
          username: username,
          count: log.length,
          _id: _id,
          log: log,
        });
      }
    });
  }

  //,"log.date":{$gt:[new Date("log.date"),new Date(from)]}
};

module.exports = {
  createUser,
  findAll,
  addExercises,
  findAndReturnLogs,
};
