const teamModel = require("../models/teamModel");
const accountModel = require("../models/accountModel")
const { ObjectId } = require('mongodb')
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

exports.index = async function (req, res) {
    // Get from model
    teams = await teamModel.getMyTeam(res.locals.user._id);
    user = req.user;
    // Pass data to view to display
    res.render('team',
        {
            teams,
            user,
            layout: 'dashboard/main', 
            title: "Team", 
            username: res.locals.user.user_name,
            ID: 1
        })
};

exports.delTeam = (req, res, next) => {
    // Get from model
    teamModel.delUserTeamByTeamId(req.body.id);
    teamModel.delTeamByTeamId(req.body.id);
    // Pass data to view to display
};

exports.leaTeam = async function(req, res, next) {
    // Get from model
    await teamModel.delUserTeam(req.body.teamid,req.body.userid);
    team = await teamModel.getTeamById(req.body.teamid);

    number = parseInt(team.total_member);
    --number;
    teamModel.setTotalMember(team._id,number);
    // Pass data to view to display
};

exports.delMem = async function(req,res,next) {
    team = await teamModel.getTeamByOwner(res.locals.user._id);
    number = parseInt(team.total_member);

    --number;
    teamModel.delUserTeam(team._id,req.body.id);
    teamModel.setTotalMember(team._id,number);

    // Pass data to view to display
    res.send({ redirect: '/team' });
}

exports.addMem = async function (req, res, next) {
    // Get from model
    team = await teamModel.getTeamByOwner(res.locals.user._id);
    number = parseInt(team.total_member);
    numOfBox = parseInt(req.body.numOfBox) + 1;
    
    for (i = 1; i < numOfBox; i++) {
        userId = await teamModel.getUserIdByEmail(req.body['member' + i]);
        userTeam = await teamModel.getUserTeam(team._id, userId);

        if (userId != null) {

            if (userTeam == null) {
                user = {
                    ['team-id']: ObjectId(team._id),
                    ['user-id']: ObjectId(userId),
                    'inteam': false
                }
                ++number;
                teamModel.addUserTeam(user);
                teamModel.setTotalMember(team._id, number);
            }

            if (userTeam == null || userTeam.inteam == false ) {


                // generate invitation code
                inviteCode = uuidv4();
                teamModel.addInvitationToken(inviteCode, userId, team._id);

                
                // link: to change
                url = "http://" + req.get('host') + "/join/" + inviteCode;

                // send email
                let transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.PASSWORD
                    }
                });

                let mailOptions = {
                    from: "dretro@gmail.com",
                    to: req.body['member' + i],
                    subject: "[DRetro] Invitation to my team",
                    html: "Please click this link to become a part of our team: <a href=\"" + url + "\">" + url + "</a>"
                };

                transporter.sendMail(mailOptions, function (err, data) {
                    if (err) {
                        console.log("Error Occurs");
                    } else {
                        console.log("Email sent");
                    }
                });
            }
        }
    }
    // Pass data to view to display
    res.send({ redirect: '/team' });
};

exports.addTeam = async function(req,res,next) {
    team = {
        owner: ObjectId(res.locals.user._id),
        name: req.body.newTeam,
        total_member: 1
    }
    teamId = await teamModel.createNewTeam(team);
    userTeam = {
        ['team-id']: ObjectId(teamId),
        ['user-id']: ObjectId(res.locals.user._id),
        'inteam': true
    }
    await teamModel.addUserTeam(userTeam);
    res.redirect("/team");
}