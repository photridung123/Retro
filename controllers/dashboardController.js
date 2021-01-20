const boardModel = require("../models/boardModel");
const teamModels = require("../models/teamModel");
const accountModels = require("../models/accountModel");
const { ObjectId } = require('mongodb');
exports.index = async (req, res, next) => {

    //FIND PUBLIC BOARDS
    let public_boards = await boardModel.FindBoards(res.locals.user._id, "public");
    for (let i = 0; i < public_boards.length; i++) {
        let total_card = 0;
        let columns = await boardModel.FindColumns(public_boards[i]._id);
        if (columns.length > 0)
            for (let j = 0; j < columns.length; j++) {
                let cards = await boardModel.FindCards(columns[j]._id);
                total_card += cards.length;
            }
        public_boards[i].total_card = total_card;
        public_boards[i].board_URL = "http://localhost:3000/board/" + public_boards[i]._id;
    }

    //FIND TEAM BOARDS
    let team = await teamModels.getMyTeam(res.locals.user._id);
    for (let i = 0; i < team.length; i++) {
        team[i].team_name = team[i].name;
        let team_boards = await boardModel.FindBoards(team[i]._id, "team");
        if (team_boards.length > 0)
            for (let j = 0; j < team_boards.length; j++) {
                let total_card = 0;
                let columns = await boardModel.FindColumns(team_boards[j]._id);
                if (columns.length > 0)
                    for (let k = 0; k < columns.length; k++) {
                        let cards = await boardModel.FindCards(columns[k]._id);
                        total_card += cards.length;
                    }
                team_boards[j].total_card = total_card;
                team_boards[j].board_URL = "http://localhost:3000/board/" + team_boards[j]._id;
            }
        team[i].team_boards = team_boards;
        delete team[i].name;
        delete team[i].ownerInfo;
        delete team[i].members;
    }

    // Pass data to view to display
    res.render('vwdashboard',
        {
            public_boards,
            team,
            layout: 'dashboard/main',
            title: "Dashboard",
            ID: 1,
            username: res.locals.user.user_name
        });
};

exports.AddBoard = async (req, res) => {

    let max_vote = 6;

    let list_col = JSON.parse(req.body.list_col);
    if (req.body.max_vote) max_vote = parseInt(req.body.max_vote);
    let board = {
        owner_id: ObjectId(req.body.owner_id),
        board_name: req.body.board_name,
        max_vote,
        current_vote: 0,
        date_created: new Date()
    }

    let board_type = "public";

    let team = await teamModels.getTeamById(board.owner_id);
    if (team) {
        board_type = "team";
        const team = await teamModels.getTeamById(req.body.owner_id);
        const user_pricing = await accountModels.getUserPricingFull(team.owner);
        let amount_team_board = parseInt(user_pricing['team-board']);
        await accountModels.UpdateAmountTeamBoard(amount_team_board-1, team.owner);
    }
    else {

        const user_pricing = await accountModels.getUserPricingFull(res.locals.user._id);
        let amount_public_board = parseInt(user_pricing['public-board']);
        await accountModels.UpdateAmountPublicBoard(amount_public_board-1, res.locals.user._id);
    }

    board.board_type = board_type;

    const result = await boardModel.AddBoards(board);
    if (list_col.length > 0) {
        for (let i = 0; i < list_col.length; i++) {
            if (list_col[i]) {
                let col = {
                    column_name: list_col[i],
                    board_id: result.insertedId
                }
                await boardModel.AddCol(col);
            }
        }
    }

    board.total_card = 0;
    board.board_URL = "http://localhost:3000/board/" + result.insertedId;
    res.send({ new_board: board });
}

exports.DeleteBoard = async (req, res) => {
    let board_id = req.body.board_id;
    const temp = await boardModel.FindBoardByBoardId(board_id);
    if (temp.owner_id.toString() != res.locals.user._id.toString()) {

        const team = await teamModels.getTeamById(temp.owner_id);
        if (team.owner != res.locals.user._id.toString()) {
            return res.send({ LackOfPermissions: true });
        }
        else {
            //update team board amount
            const user_pricing = await accountModels.getUserPricingFull(team.owner);
            let amount_team_board = parseInt(user_pricing['team-board']);
            await accountModels.UpdateAmountTeamBoard(amount_team_board+1, team.owner);
        }
    }
    else {
        //update public board amount
        const user_pricing = await accountModels.getUserPricingFull(res.locals.user._id);
        let amount_public_board = parseInt(user_pricing['public-board']);
        await accountModels.UpdateAmountPublicBoard(amount_public_board+1, res.locals.user._id);
    }

    //delete board
    await boardModel.DeleteBoard(board_id);
    let cols = await boardModel.FindColumns(board_id);
    if (cols.length > 0) {
        for (let i = 0; i < cols.length; i++) {

            const list_card = await boardModel.FindCards(cols[i]._id);

            for (let j = 0; j < list_card.length; j++) {
                await boardModel.DeleteVoteByCardId(list_card[j]._id);
                await boardModel.DeleteCmtByCardId(list_card[j]._id);
                await boardModel.DeleteCardByID(list_card[j]._id);
            }

        }
    }
    await boardModel.DeleteCols(board_id);
    return res.send({ DeleteBoardSuccess: true });

}

exports.getCurrentBoard = async (req, res) => {
    let type = req.body.board_type;
    if (type == "public") {
        const user_pricing = await accountModels.getUserPricingFull(res.locals.user._id);
        return res.send({ amount_board: parseInt(user_pricing['public-board']) });
    } else {
        const team = await teamModels.getTeamById(req.body.owner_id);
        const user_pricing = await accountModels.getUserPricingFull(team.owner);
        return res.send({ amount_board: parseInt(user_pricing['team-board']) });
    }
}