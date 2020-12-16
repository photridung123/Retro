const userModel = require("../models/userModel")

exports.index = (req, res, next) => {
    // Get from model
    
    // Pass data to view to display
    res.render('register',
    {
        layout: false, title: "register page"
    });
};

exports.addUser = async function(req,res) {
    const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    }
    try {
        await userModel.addUser(newUser);
        res.redirect("/login");
    } catch (err) {
        res.render("register", { title: "failed to register" });
        return;
    }
}

