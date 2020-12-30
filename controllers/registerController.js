const userModel = require("../models/userModel");
const accountModel = require("../models/accountModel");
const passport = require("../passport");
const dateFormat = require("dateformat");

exports.index = (req, res, next) => {
    // Get from model
    
    // Pass data to view to display
    res.render('register',
    {
        layout: false, title: "register", alert: "registerOnLoad" // alert to show register alert on register failure
    });
};

exports.addUser = async function(req,res) {

    const valid = await userModel.checkValid(req.body.email);
    const now = new Date();
    const currentDate = dateFormat(now,"paddedShortDate");
    console.log(currentDate);

    if(valid)
    {
        const newUser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: null,
            dob: null,
            date: currentDate,
        }
            user = await userModel.addUser(newUser);
            await accountModel.addNewUserPricing(user._id,"basic");
            await accountModel.addNewPricingHistory(user._id,"basic");
            req.login(user, function(err) {
                if (err) {
                  console.log(err);
                }
                return res.redirect('/dashboard');
              });
    }
    else
    {
        res.render('register',
        {
            layout: false, title: "register", alert: "registerFailed" // alert to show register alert on register failure
        });
    }
}

