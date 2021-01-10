
const { db } = require('../db/db');
const { ObjectId } = require('mongodb');
const lodash = require('lodash');

exports.add = (team) => {
    const teamCollection = db().collection('tbl_teams');
}

exports.delete = (team) => {
    const teamCollection = db().collection('tbl_teams');
}



// team function dont touchy touchy 
exports.getTeamByOwner = async (id) => {
    const teamCollection = db().collection('tbl_teams');
    const team = await teamCollection.findOne({ owner: ObjectId(id) });
    return team;
}

exports.getUserIdByEmail = async (email) => {
    const userCollection = db().collection('tbl_users');
    const userInfo = await userCollection.findOne({ user_email: email });
    if (userInfo != null) {
        return userInfo._id;
    }
    else {
        return null;
    };
}

exports.delUserTeamByTeamId = async(teamId) => {
    const teamCollection = db().collection('tbl_user_team');
    teamCollection.deleteMany({
        'team-id' : ObjectId(teamId)
    });
}

exports.delTeamByTeamId = async(teamId) => {
    const teamCollectinon = db().collection('tbl_teams');
    teamCollectinon.deleteOne({
        _id: ObjectId(teamId)
    });
}

exports.delUserTeam = async(teamId, userId) => {
    const teamCollection = db().collection('tbl_user_team');
    teamCollection.deleteOne({
        $and: [
            { 'team-id': ObjectId(teamId) },
            { 'user-id': ObjectId(userId) }
        ]
    })
}

exports.getUserTeam = async (teamId, userId) => {
    const teamCollection = db().collection('tbl_user_team');
    const userTeam = await teamCollection.findOne({
        $and: [
            { 'team-id': ObjectId(teamId) },
            { 'user-id': ObjectId(userId) }
        ]
    });
    return userTeam;
}

exports.addUserTeam = async (user_team) => {
    const teamCollection = db().collection('tbl_user_team');
    const result = await teamCollection.insertOne(user_team);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

exports.setTotalMember = async (teamId,total_member) => {
    const teamCollection = db().collection('tbl_teams');
    teamCollection.updateOne({_id: ObjectId(teamId)}, { $set:
        {
          total_member: total_member
        }
     });
}

exports.joinTeam = async(invitationToken) => {
    const invitationCollection = db().collection("tbl_invitation_token");
    const teamCollectinon = db().collection("tbl_user_team");
    const userInvited = await invitationCollection.findOne({"invitation-token": invitationToken});
    if(userInvited) {
        teamCollectinon.updateOne({$and: [
            { 'team-id': ObjectId(userInvited.teamId) },
            { 'user-id': ObjectId(userInvited.userId) }
        ]}, {
            $set:
            {
              inteam: true
            }
        })
    }
    invitationCollection.deleteOne({"invitation-token": invitationToken});
}

exports.addInvitationToken = async(invitationToken,userId,teamId) => {
    const invitationCollection = db().collection("tbl_invitation_token");
    invitationCollection.createIndex({ expireAfterSeconds: 86400});
    invitationCollection.insert({
        "createAt": new Date(),
        "userId": ObjectId(userId),
        "invitation-token": invitationToken,
        "teamId": ObjectId(teamId)
    })
}

exports.getMyTeam = async (id) => {
    teams = await db().collection('tbl_teams').aggregate([
        {
            $lookup:
            {
                from: "tbl_users",
                localField: "owner",
                foreignField: "_id",
                as: "ownerInfo"
            }
        },
        {
            $unset: ["ownerInfo._id", "ownerInfo.user_password", "ownerInfo.user_dob", "ownerInfo.user_avatar", "ownerInfo.date_created"]
        },
        {
            $lookup:
            {
                from: "tbl_user_team",
                let: { "teamId": "$_id" },
                pipeline: [
                    { $match: { "$expr": { "$eq": ["$team-id", "$$teamId"] } } },
                    {
                        $lookup: {
                            from: "tbl_users",
                            let: { "memberId": "$user-id" },
                            pipeline: [
                                { $match: { "$expr": { "$eq": ["$_id", "$$memberId"] } } }
                            ],
                            as: "memberInfo"
                        }
                    }
                ],
                as: "members"
            }
        },
        {
            $unset: ["members._id", "members.team-id", "members.memberInfo._id", "members.memberInfo.user_password", "members.memberInfo.date_created", "members.memberInfo.user_dob", "members.memberInfo.user_avatar"]
        },
    ]).toArray();
    picked = lodash.filter(teams, { 'members': [{ 'user-id': id }] });
    // picked = lodash.merge(picked.members,picked.members.memberInfo)
    //console.log(JSON.stringify(picked));

    return picked;
}

exports.createNewTeam = async(teamInfo) => {
    const teamCollection = db().collection('tbl_teams');  
    const result = await teamCollection.insertOne(teamInfo);
    console.log(`New listing created with the following id: ${result.insertedId}`);
    return result.insertedId;
}

exports.getTeamById = async(teamid) => {
    const teamCollection = db().collection('tbl_teams');  
    const team = await teamCollection.findOne({_id: ObjectId(teamid)});
    return team;
}

exports.getAllMyTeam = async(userid) => {
    const teamCollection = db().collection('tbl_user_team');
    const team = await teamCollection.find({['user-id']:ObjectId(userid)}).toArray();
    return team;
}

exports.countParticipationByTeamId = async(teamId) => {
    const teamCollectinon = db().collection('tbl_user_team');
    const count = await teamCollectinon.count({$and: [
        { 'team-id': ObjectId(teamId) },
        { inteam: true }
    ]})
    return count;
}