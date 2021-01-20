const { db } = require('../db/db');
const { ObjectId } = require('mongodb');
const moment = require('moment');
const { identity } = require('lodash');

//Khai báo biến collection

//Các hàm thêm, xoá, sửa ở đây

//Hàm trả về toàn bộ các users trong collection
// exports.list = async () => {
//     const userCollection = db().collection('tbl_users');
//     const users = await userCollection.find({}).toArray();
//     console.dir(users );
//     return users ;
// }

//lấy thông tin của user hiện tại

exports.updateUserEmail = async (userId, userEmail) => {
  const userCollection = db().collection('tbl_users');
  await userCollection.updateOne({ _id: ObjectId(userId) }, {
    $set:
    {
      user_email: userEmail
    }
  })
}

exports.updateUserName = async (userId, userName) => {
  const userCollection = db().collection('tbl_users');
  await userCollection.updateOne({ _id: ObjectId(userId) }, {
    $set:
    {
      user_name: userName
    }
  })
}


exports.updateUserPricing = async (userId, pricingName) => {
  const pricingCollection = db().collection('tbl_pricing');
  pricing = await pricingCollection.findOne({ name: pricingName });
  const userPricingCollection = db().collection('tbl_user_pricing');
  await userPricingCollection.updateOne({ ['user-id']: ObjectId(userId) }, {
    $set:
    {
      ['pricing-id']: ObjectId(pricing._id)
    }
  }
  );
}


exports.updateUserAvatar = async (id, avatar) => {
  const userCollection = db().collection('tbl_users');
  await userCollection.updateOne({ _id: ObjectId(id) }, { $set: { user_avatar: avatar } });
}

exports.addNewUserPricing = async (userId, pricingName) => {
  let teamBoard = 0;
  let publicBoard = 0;
  let teamNumber = 0;
  if(pricingName == "basic") {
    publicBoard = 3;
  }
  else {
    teamBoard = 200;
    publicBoard = 5;
    teamNumber = 1;
  }
  const pricingCollection = db().collection('tbl_pricing');
  pricing = await pricingCollection.findOne({ name: pricingName });
  const userPricingCollection = db().collection('tbl_user_pricing');
  userPricing = {
    ['user-id']: ObjectId(userId),
    ['pricing-id']: ObjectId(pricing._id),
    ['public-board']: parseInt(publicBoard),
    ['team-board']: parseInt(teamBoard),
    teamNumber: parseInt(teamNumber)
  }
  await userPricingCollection.insertOne(userPricing);
}


exports.addNewPricingHistory = async (userId, pricingName) => {
  const pricingCollection = db().collection('tbl_pricing');
  const pricingHistoryCollection = db().collection('tbl_pricing_history');
  pricing = await pricingCollection.findOne({ name: pricingName });

  const now = new Date();
  const end = moment(now);
  end.add(1, 'months');
  //const currentDate = dateFormat(now,"paddedShortDate");
  //const endDate = dateFormat(end,"paddedShortDate");
  pricingHistory = {
    ['pricing-id']: ObjectId(pricing._id),
    ['user-id']: ObjectId(userId),
    startDay: now,
    endDay: end._d
  }
  await pricingHistoryCollection.insertOne(pricingHistory)
}

exports.getUserPricing = async (userId) => {
  const userPricingCollection = db().collection('tbl_user_pricing');
  const pricingCollection = db().collection('tbl_pricing');
  userPricing = await userPricingCollection.findOne({ ['user-id']: ObjectId(userId) });
  currentPricing = userPricing['pricing-id'];
  pricing = await pricingCollection.findOne({ _id: ObjectId(currentPricing) });
  return pricing.name;
}

exports.getTeamNumber = async(userId) => {
  const userPricingCollection = db().collection('tbl_user_pricing');
  userPricing = await userPricingCollection.findOne({ ['user-id']: ObjectId(userId) });
  return userPricing.teamNumber;
}

exports.updateTeamNumber = async(userId,number) => {
  const userPricingCollection = db().collection('tbl_user_pricing');
  await userPricingCollection.updateOne({ ['user-id']: ObjectId(userId) },{$set:{teamNumber: parseInt(number)}});
}

exports.getUserPricingHistory = async (userId) => {
  history = await db().collection('tbl_pricing_history').aggregate([
    {
      $match: { ['user-id']: ObjectId(userId) }
    },
    {
      $lookup:
      {
        from: "tbl_pricing",
        localField: "pricing-id",
        foreignField: "_id",
        as: "pricing"
      }
    },
    {
      $unset: ["pricing._id", "pricing.max-board", "pricing.max-team"]
    },
    { $sort: { startDay: -1 } }
  ]).toArray();
  return history;
}

exports.getAllUserId = async () => {
  userIds = await db().collection('tbl_users').distinct("_id");
  return userIds;
}

exports.getCurrentHistory = async (id) => {
  history = await db().collection('tbl_pricing_history').find({ ['user-id']: ObjectId(id) }).sort({ startDay: -1 }).limit(1);
  return history;
}

exports.updatePublicBoard = async (userId) => {
  history = await db().collection('tbl_pricing_history').find({ ['user-id']: ObjectId(userId) }).sort({ startDay: -1 }).limit(1);
  publicBoard = history['public-board'] + 5;
  await db().collection('tbl_pricing_history').updateOne({ ['user-id']: ObjectId(userId) }, {
    $set:
    {
      ['public-board']: publicBoard
    }
  })
}