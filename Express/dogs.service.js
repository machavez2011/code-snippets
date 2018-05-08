const dogsHacker = require("../models/dogs");
const mongodb = require("../mongodb");
const conn = mongodb.connection;
const ObjectId = mongodb.ObjectId;

module.exports = {
  readAll: readAll,
  readById: readById,
  create: create,
  update: update,
  delete: _delete
};

function readAll() {
  return conn
    .db()
    .collection("dogs")
    .find()
    .toArray()
    .then(dogs => {
      for (let i = 0; i < dogs.length; i++) {
        let dog = dogs[i];
        dog._id = dog._id.toString();
      }
      return dogs;
    });
}

function readById(id) {
  return conn
    .db()
    .collection("dogs")
    .findOne({ _id: new ObjectId(id) })
    .then(dogs => {
      dogs._id = dogs._id.toString();
      return dogs;
    });
}

function create(model) {
  return conn
    .db()
    .collection("dogs")
    .insert(model)
    .then(result => result.insertedIds[0].toString());
}

function update(id, doc) {
  doc._id = new ObjectId(doc._id);

  return conn
    .db()
    .collection("dogs")
    .replaceOne({ _id: new ObjectId(id) }, doc)
    .then(result => Promise.resolve());
}

function _delete(id) {
  return conn
    .db()
    .collection("dogs")
    .deleteOne({ _id: new ObjectId(id) })
    .then(result => Promise.resolve());
}
