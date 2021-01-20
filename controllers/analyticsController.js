const teamModel = require('../models/teamModel');
const boardModel = require('../models/boardModel');
const dateFormat = require('dateformat');

exports.index = async (req, res, next) => {
    // Get from model

    // team board
    teams = await teamModel.getAllMyTeam(res.locals.user._id);

    tempBoards = [];

    for (let i in teams) {


        let teamBoards = [];
        let target = {};

        team = await teamModel.getTeamById(teams[i]['team-id']);

        target = Object.assign(target, team);

        board = await boardModel.FindBoards(team._id, "team");

        for (let l in board) {


            let wroters = 0;
            let voters = 0;
            let wrt = [];
            let vt = [];
            let count = 0;

            let participation = await teamModel.countParticipationByBoardId(board[l]._id);
        
            participation = (participation/team.total_member)*100;

            board[l].date_created = dateFormat(board[l].date_created, "paddedShortDate");
            columns = await boardModel.FindColumns(board[l]._id);
            for (let j in columns) {
                cards = await boardModel.FindCards(columns[j]._id);
                for (let k in cards) {
                    count++;
                    voter = await boardModel.FindVotes(cards[k]._id);
                    wroter = await boardModel.FindComments(cards[k]._id);
                    Array.prototype.push.apply(vt, voter);
                    Array.prototype.push.apply(wrt, wroter);

                }
            }
            let nwroters = wrt.reduce((acc, o) => (acc[o.comment_owner] = (acc[o.comment_owner] || 0) + 1, acc), {});
            let nvoters = vt.reduce((acc, o) => (acc[o.vote_owner] = (acc[o.vote_owner] || 0) + 1, acc), {});
            voters = Object.keys(nvoters).length;
            wroters = Object.keys(nwroters).length;

            board[l].voters = voters;
            board[l].wroters = wroters;
            board[l].cards = count;

            //console.log("board:", board[l]);

            //Array.prototype.push.apply(teamBoards, board[l]);
            teamBoards.push(board[l]);
            target["boards"] = teamBoards;
            target["participation"] = participation;
        }
        tempBoards.push(target);
    }
    //console.log("team",JSON.stringify(tempBoards));

    // public board
    publicBoards = await boardModel.FindBoards(res.locals.user._id, "public");


    for (let i in publicBoards) {

        let wrt = [];
        let vt = [];
        let wroters = 0;
        let voters = 0;
        let count = 0;

        publicBoards[i].date_created = dateFormat(publicBoards[i].date_created, "paddedShortDate");
        columns = await boardModel.FindColumns(publicBoards[i]._id);
        for (let j in columns) {
            cards = await boardModel.FindCards(columns[j]._id);
            for (let k in cards) {
                count++;
                voter = await boardModel.FindVotes(cards[k]._id);
                wroter = await boardModel.FindComments(cards[k]._id);
                Array.prototype.push.apply(vt, voter);
                Array.prototype.push.apply(wrt, wroter);

            }
        }
        let nwroters = wrt.reduce((acc, o) => (acc[o.comment_owner] = (acc[o.comment_owner] || 0) + 1, acc), {});
        let nvoters = vt.reduce((acc, o) => (acc[o.vote_owner] = (acc[o.vote_owner] || 0) + 1, acc), {});
        voters = Object.keys(nvoters).length;
        wroters = Object.keys(nwroters).length;

        publicBoards[i].voters = voters;
        publicBoards[i].wroters = wroters;
        publicBoards[i].cards = count;
    }




    // Pass data to view to display
    res.render('analytics',
        {
            public_boards: publicBoards,
            team_boards: tempBoards,
            layout: 'dashboard/main',
            title: "Analytics",
            ID: 1,
            username: res.locals.user.user_name
        })
};