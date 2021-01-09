const accountModel = require('../models/accountModel');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const dateFormat = require('dateformat');
const path = require('path');

exports.index = async (req, res, next) => {
    // Get from model
    history = await accountModel.getUserPricingHistory(res.locals.user._id);

    for (var i in history) {
        history[i].startDay = dateFormat(history[i].startDay, "paddedShortDate");
        history[i].endDay = dateFormat(history[i].endDay, "paddedShortDate");
    }
    // Pass data to view to display
    res.render('account', {
        user: res.locals.user,
        payment_history: history,
        layout: 'dashboard/main',
        title: "Account",
        ID: 1,
        username: res.locals.user.user_name,
        avatar: res.locals.user.user_avatar
    });
    //console.log(list_user);
};

exports.changeEmail = async (req, res, next) => {
    let checkPassword = await bcrypt.compare(req.body.password, res.locals.user.user_password);

    if (checkPassword) {
        req.logout();
        accountModel.updateUserEmail(res.locals.user._id, req.body.newEmail);
        user = await userModel.getUser(res.locals.user._id);
        req.login(user, function (err) {
            if (err) {
                console.log(err);
            }
            else {
                res.locals.user = user;
            }
        });
        res.send({ change: 1 });
    } else {
        res.send({ change: 0 });
    }
}

exports.changeUsername = async (req, res, next) => {
    await accountModel.updateUserName(res.locals.user._id, req.body.newUserName);
    res.locals.user.user_name = req.body.newUserName;

    res.send({ respond: 1 });
}

exports.changeAvatar = async (req, res, next) => {
    let path_img;
    let new_path;
    let user_avatar;

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/images/')
        },
        filename: function (req, file, cb) {
            cb(null, "user_avatar" + res.locals.user._id.toString() + path.extname(file.originalname));
            path_img = "user_avatar" + res.locals.user._id.toString() + path.extname(file.originalname);
        }
    });

    const upload = multer({ storage });
    upload.single('newImage')(req, res, async function (err) {
        if (err) {
            console.log(err);
        } else {
            new_path = __dirname + '/../public/images/' + path_img;
            if (new_path) {
                await cloudinary.uploader.upload(new_path, { public_id: "avatar_user" + res.locals.user._id.toString(), folder: 'users/images', unique_filename: true, overwrite: true })
                    .then(function (image) {
                        user_avatar = image.url;
                    })
                    .catch(function (err) {
                        if (err) { console.warn(err); }
                    });
            }
            await accountModel.updateUserAvatar(res.locals.user._id, user_avatar);
            res.locals.user.user_avatar = user_avatar;
            res.send({ imageUrl: user_avatar });
        }
    });
}

exports.getUserType = async (req, res, next) => {
    userType = await accountModel.getUserPricing(res.locals.user._id);
    res.send({ type: userType });
}