const {db} = require('../db/db');
const {ObjectId} = require('mongodb');
const dateFormat = require('dateformat');
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

exports.updateUserEmail = async(userId,userEmail) => {
    const userCollection = db().collection('tbl_users');
    await userCollection.updateOne({_id: ObjectId(userId)}, {
        $set:
        {
          user_email: userEmail
        }
    })
}

exports.updateUserName = async(userId,userName) => {
  const userCollection = db().collection('tbl_users');
  await userCollection.updateOne({_id: ObjectId(userId)}, {
      $set:
      {
        user_name: userName
      }
  })
}

exports.addNewUserPricing = async(userId,pricingName) => {
  const pricingCollection = db().collection('tbl_pricing');
  pricing = await pricingCollection.findOne({name: pricingName});
  const userPricingCollection = db().collection('tbl_user_pricing');
  userPricing = {
    ['user-id'] : ObjectId(userId),
    ['pricing-id'] : ObjectId(pricing._id)
  }
  await userPricingCollection.insertOne(userPricing);
}

exports.addNewPricingHistory = async(userId,pricingName) => {
  const pricingCollection = db().collection('tbl_pricing');
  const pricingHistoryCollection = db().collection('tbl_pricing_history');
  pricing = await pricingCollection.findOne({name: pricingName});

  const now = new Date();
  const end = moment(now);
  end.add(1,'months');
  const currentDate = dateFormat(now,"paddedShortDate");
  const endDate = dateFormat(end,"paddedShortDate");
  pricingHistory = {
    ['pricing-id'] : ObjectId(pricing._id),
    ['user-id'] : ObjectId(userId),
    startDay: currentDate,
    endDay: endDate
  }
  await pricingHistoryCollection.insertOne(pricingHistory)
}

exports.getUserPricing = async(userId) => {
  const userPricingCollection = db().collection('tbl_user_pricing');
  const pricingCollection = db().collection('tbl_pricing');
  userPricing = await userPricingCollection.findOne({['user-id']: ObjectId(userId)});
  currentPricing = userPricing['pricing-id'];
  pricing = await pricingCollection.findOne({_id: ObjectId(currentPricing)});
  return pricing.name;
}