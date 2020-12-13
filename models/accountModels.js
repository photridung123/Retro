const {db} = require('../db/db');
const {ObjectId} = require('mongodb');

//Khai báo biến collection

//Các hàm thêm, xoá, sửa ở đây

//Hàm trả về toàn bộ các users trong collection
exports.list = async () => {
    const userCollection = db().collection('tbl_users');
    const users = await userCollection.find({}).toArray();
    console.dir(users );
    return users ;
}
