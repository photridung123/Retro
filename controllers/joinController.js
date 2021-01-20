const teamModel = require("../models/teamModel");
const { ObjectId } = require('mongodb')

exports.index = (req, res, next) => {
    // Get from model
    invitationCode = req.originalUrl.replace("/join/","");
    teamModel.joinTeam(invitationCode);
    // Pass data to view to display
    req.logout();
    res.redirect('/team');
};