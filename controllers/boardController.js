const boardModel = require("../models/boardModel");
const userModels = require("../models/userModel");
const { ObjectId } = require('mongodb');

exports.index = async (req, res, next) => {
    // Get from model

    let board_id = req.params.id;
    const board = await boardModel.FindBoardByBoardId(board_id);
    const vote_of_current_user = await boardModel.GetVoteByUserID(res.locals.user._id);

    //GET MAX VOTE
    let max_vote = parseInt(board.max_vote);
    if (vote_of_current_user) {
        max_vote -= vote_of_current_user.length;
    }

    //GET COLUMN
    let columns = await boardModel.FindColumns(board_id);
    if (columns.length > 0) {
        for (let i = 0; i < columns.length; i++) {
            let cards = await boardModel.FindCards(columns[i]._id);

            console.log(cards);
            //FORMAT CARD
            if (cards.length > 0) {
                for (let j = 0; j < cards.length; j++) {
                    let user = await userModels.getUser(cards[j].card_owner);
                    cards[j].card_owner = user.user_name;
                    let votes = await boardModel.FindVotes(cards[j]._id);
                    let comments = await boardModel.FindComments(cards[j]._id);
                    cards[j].total_vote = 0;
                    cards[j].total_comment = 0;

                    //FORMAT VOTE OF CARD
                    if (votes.length > 0) cards[j].total_vote = votes.length;

                    //FORMAT CMT OF CARD
                    if (comments.length > 0) {
                        cards[j].total_comment = comments.length;
                        for (let k = 0; k < comments.length; k++) {
                            let temp = await userModels.getUser(comments[k].comment_owner);
                            comments[k].comment_owner = temp.user_name;
                        }
                        cards[j].comments = comments;
                    }

                    //FORMAT VOTE OF CARD
                    for (let k = 0; k < vote_of_current_user.length; k++) {
                        if (vote_of_current_user[k].card_id.toString() == cards[j]._id.toString())
                            cards[j].like = true;
                    }
                }
                columns[i].cards = cards;
            }
        }
    }
    let total_columns = 0;
    if (columns.length > 0) total_columns = columns.length;

    // Pass data to view to display
    res.render('board',
        {
            board_name: board.board_name,
            board_id,
            max_vote,
            total_columns,
            columns,
            layout: 'dashboard/main', title: "Board", ID: 1
        });
};

exports.AddCmt = async (req, res) => {


    let cmt = {
        comment_text: req.body.comment_text,
        comment_owner: res.locals.user._id,
        card_id: ObjectId(req.body.card_id)
    }
    await boardModel.AddComment(cmt);
}

exports.Vote = async (req, res) => {

    let isLike = req.body.isLike;
    if (isLike == 'false') {
        await boardModel.DeleteVote(req.body.card_id, res.locals.user._id);
    }
    else {
        let vote = {
            card_id: ObjectId(req.body.card_id),
            vote_owner: ObjectId(res.locals.user._id)
        }

        await boardModel.AddVote(vote);
    }
}

exports.DeleteCmt = async (req, res) => {

    console.log(req.body);
    await boardModel.DeleteCmt(req.body.comment_id);
}