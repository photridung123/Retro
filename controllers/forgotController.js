exports.index = (req, res, next) => {
    // Get from model
    
    // Pass data to view to display
    res.render('forgot',
    {
        layout: false, title: "forgot"
    });
};