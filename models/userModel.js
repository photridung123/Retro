const bcrypt = require('bcrypt');

const {db} = require('../db/db');
const {ObjectId} = require('mongodb');

exports.addUser = async(newUser) => {
  const saltRounds = 10;

  await(bcrypt.genSalt(saltRounds,function(err,salt){
    bcrypt.hash(newUser.password,salt,function(err,hash){
      const user = {
        user_name: newUser.username,
        user_email: newUser.email,
        user_password: hash,
        user_avatar: null,
        date_dob: null,
        date_created: new Date(),
      }
    const userCollection = db().collection('tbl_users');
    const result = userCollection.insertOne(user);
    console.log(`New listing created with the following id: ${result.insertedId}`);
    })
  }));
  return;
}

exports.checkCredential = async (username,password) =>{
  const userCollection = db().collection('tbl_users');
  const user = await userCollection.findOne({user_email: username});
  if(!user)
  {
    return false;
  }
  let checkPassword = await bcrypt.compare(password,user.user_password);
  if(checkPassword)
  {
    return user;
  }
  return false;
}

exports.getUser = (id) => {
  const userCollection = db().collection('tbl_users');
  return userCollection.findOne({_id: ObjectId(id)});
}