const {db} = require('../db/db');
const {ObjectId} = require('mongodb');

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