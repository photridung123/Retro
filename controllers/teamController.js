exports.index = (req, res, next) => {
    // Get from model
    
    // Pass data to view to display
    res.render('team',
    team=
    {
        total_member: 1, 
        name: "our board", 
        owner: 1, 
        id: 1}
    );
};