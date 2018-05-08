const mongodb = require("../mongodb");
const conn = mongodb.connection;
const ObjectId = mongodb.ObjectId;

module.exports = {
  getPointsPerDay: getPointsPerDay
};

function getPointsPerDay(req) {
  let aggregate = [];
  let match = {
    $match: {
      userId: ObjectId(req.auth.userId)
    }
  };
  let createDate = {};
  let group = {
    $group: {
      _id: { $dateToString: { format: "%Y-%m-%d", date: "$createDate" } },
      count: { $sum: "$challenge.points" }
    }
  };
  if (typeof req.query.startDate !== "undefined") {
    createDate.$gte = new Date(req.query.startDate);
  }
  if (typeof req.query.endDate !== "undefined") {
    createDate.$lte = new Date(req.query.endDate);
  }
  if (Object.keys(createDate).length > 0) {
    match.$match.createDate = createDate;
  }
  aggregate.push(match, group);
  return conn
    .db()
    .collection("interactions")
    .aggregate(aggregate)
    .toArray()
    .then(pointsByDay => {
      return pointsByDay;
    });
}
