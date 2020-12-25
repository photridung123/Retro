
const {db} = require('../db/db');
const {ObjectId} = require('mongodb');
const lodash = require('lodash');

exports.add = (team) => {
    const teamCollection = db().collection('tbl_teams');
}

exports.delete = (team) => {
    const teamCollection = db().collection('tbl_teams');
}

exports.getTeam = async (id) => {
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
            $unset: ["ownerInfo._id","ownerInfo.user_password","ownerInfo.user_dob","ownerInfo.user_avatar","ownerInfo.date_created"]
        },
        { $lookup: 
            {
                from: "tbl_user_team",
                let: { "teamId": "$_id" },
                pipeline: [
                  { $match: { "$expr": { "$eq": ["$team-id", "$$teamId"] }}},
                  { $lookup: {
                    from: "tbl_users",
                    let: { "memberId": "$user-id" },
                    pipeline: [
                      { $match: { "$expr": { "$eq": ["$_id", "$$memberId"] }}}
                    ],
                    as: "memberInfo"
                  }}
                ],
                as: "members"
            }
        },
        {
            $unset: ["members._id","members.team-id","members.memberInfo._id","members.memberInfo.user_password","members.memberInfo.user_avatar","members.memberInfo.date_created","members.memberInfo.user_dob"]
        },
    ]).toArray();
    picked = lodash.filter(teams,{ 'members': [{'user-id': id}]});
    // picked = lodash.merge(picked.members,picked.members.memberInfo)
    console.log(JSON.stringify(picked));

    return picked;
}