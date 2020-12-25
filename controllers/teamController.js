const teamModel = require("../models/teamModel");

exports.index = async function(req, res) {
    // Get from model
    teams = await teamModel.getTeam(res.locals.user._id);
    // Pass data to view to display
    res.render('team',
    {
        teams,
        layout: 'dashboard/main', title: "Team", ID: 1
    })
};

exports.delete = (req, res, next) => {
    // Get from model
    
    // Pass data to view to display
};

exports.add = (req, res, next) => {
    // Get from model
    const team = {
        owner: req.user._id,
        name : req.body.name,
        total_member: req.body.member
    }
    teamModel.add(team);
    // Pass data to view to display
};