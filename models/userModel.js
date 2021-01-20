const bcrypt = require('bcrypt');

const {db} = require('../db/db');
const {ObjectId} = require('mongodb');

exports.addUser = async(newUser) => {
  const userCollection = db().collection('tbl_users');
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(newUser.password, salt);
  const user = {
    user_name: newUser.username,
    user_email: newUser.email,
    user_password: hash,
    user_avatar: newUser.avatar,
    user_dob: newUser.dob,
    date_created: newUser.date,
  } 
  await userCollection.insertOne(user);
  const User = await userCollection.findOne({user_email: newUser.email});
  return User;
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

exports.checkValid = async (username) => {
  const userCollection = db().collection('tbl_users');
  const user = await userCollection.findOne({user_email: username});
  if(!user)
  {
    return true;
  }
  else
  {
    return false;
  }
}

exports.getUser = (id) => {
  const userCollection = db().collection('tbl_users');
  return userCollection.findOne({_id: ObjectId(id)});
}