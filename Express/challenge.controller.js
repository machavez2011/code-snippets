const responses = require("../models/responses");
const moment = require("moment");
const mongodb = require("../mongodb");
const conn = mongodb.connection;

module.exports = {
  premiumChallengesController: premiumChallengesController
};

function premiumChallengesService(tier, currentTime) {
  return conn
    .db()
    .collection("challenges")
    .aggregate([
      {
        $match: {
          tier: { $in: tier },
          isActive: true,
          "timeRange.startTime": { $lte: currentTime },
          "timeRange.endTime": { $gte: currentTime }
        }
      }
    ])
    .toArray()
    .then(challenges => {
      return challenges;
    });
}

function premiumChallengesController(req, res) {
  if (req.query.tier === undefined) {
    req.query.tier = [];
  } else if (typeof req.query.tier === "string") {
    req.query.tier = [req.query.tier];
  }
  let currentTime = moment().format("HHmm");
  let tier = req.query.tier;
  premiumChallengesService(tier, currentTime)
    .then(challenges => {
      const responseModel = new responses.ItemResponse();
      responseModel.items = challenges;
      res.json(responseModel);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(new responses.ErrorResponse(err));
    });
}
