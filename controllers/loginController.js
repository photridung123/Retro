exports.index = (req, res, next) => {
    // Get from model
    
    // Pass data to view to display
    res.render('login',
    {
        layout:false, title: "login", alert: "loginOnLoad"
    });
};

exports.fail = (req, res, next) => {
    // Get from model
    
    // Pass data to view to display
    res.render('login',
    {
        layout:false, title: "login", alert: "loginFailed"
    });
};