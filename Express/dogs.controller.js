function getByTiers(tier) {
  return conn
    .db()
    .collection("challenges")
    .aggregate([
      {
        $match: {
          tier: { $in: tier } 
        }
      },
      {
        $lookup: {
          from: "sponsors",
          localField: "sponsorId",
          foreignField: "_id",
          as: "sponsorId"
        }
      },
      {
        $unwind: {
          path: "$sponsorId",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          "sponsorId.firstName": 0,
          "sponsorId.lastName": 0,
          "sponsorId.email": 0,
          "sponsorId.zipCode": 0,
          "sponsorId.phone": 0,
          "sponsorId.createDate": 0,
          "sponsorId.updateDate": 0
        }
      }
    ])
    .toArray()
    .then(challenges => {
      for (let i = 0; i < challenges.length; i++) {
        let challenge = challenges[i];
        challenge._id = challenge._id.toString();
      }
      return challenges;
    });
}
