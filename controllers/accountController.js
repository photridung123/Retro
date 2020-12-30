const accountModel = require('../models/accountModel');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');

exports.index = async (req, res, next) => {
    // Get from model
    // Pass data to view to display
    res.render('account', {
        user: res.locals.user,
        payment_history: [
            {
                startDay: '29/11/2020',
                endDay: '28/12/2020',
                type: 'Premium',
                bill: '50.000 VND',
                current: 1
            },
            {
                startDay: '29/10/2020',
                endDay: '28/11/2020',
                type: 'Premium',
                bill: '50.000 VND',
                current: 0
            },
            {
                startDay: '29/09/2020',
                endDay: '28/10/2020',
                type: 'Premium',
                bill: '50.000 VND',
                current: 0
            },
            {
                startDay: '29/08/2020',
                endDay: '28/09/2020',
                type: 'Free',
                bill: '0 VND',
                current: 0
            }
        ],
        layout: 'dashboard/main',
        title: "Account",
        ID: 1,
        username: res.locals.user.user_name,
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
    req.logout();
    accountModel.updateUserName(res.locals.user._id, req.body.newUserName);
    user = await userModel.getUser(res.locals.user._id);
    req.login(user, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            res.locals.user = user;
        }
    });
    res.send({ redirect: "/account"});
}

exports.getUserType = async(req,res,next) => {
    userType = await accountModel.getUserPricing(res.locals.user._id);
    res.send({type: userType});
}