const userModel = require("../models/userModel");
const passport = require("../passport");

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

    if(valid)
    {
        const newUser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: null,
            dob: null,
            date: new Date(),
        }
            user = await userModel.addUser(newUser);
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

