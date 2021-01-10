const boardModel = require("../models/boardModel");
const userModels = require("../models/userModel");
const { ObjectId } = require('mongodb');
const { response } = require("express");

exports.index = async (req, res, next) => {
    // Get from model

    let board_id = req.params.id;
    const board = await boardModel.FindBoardByBoardId(board_id);
    const vote_of_current_user = await boardModel.GetVoteByUserID(res.locals.user._id);

    //GET MAX VOTE
    let max_vote = parseInt(board.max_vote);
    if (vote_of_current_user) {

        console.log(vote_of_current_user);
        max_vote -= vote_of_current_user.length;
    }
    console.log("----------");

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
    const result = await boardModel.AddComment(cmt);
    res.send({comment_id:result.insertedId});
}

exports.Vote = async (req, res) => {

    let isLiked = req.body.isLiked;
 
    if (isLiked == 'false') {
        await boardModel.DeleteVote(req.body.card_id, res.locals.user._id);
    }
    if (isLiked == 'true')  {
        let vote = {
            card_id: ObjectId(req.body.card_id),
            vote_owner: ObjectId(res.locals.user._id)
        }

        await boardModel.AddVote(vote);
    }
}

exports.DeleteCmt = async (req, res) => {

    await boardModel.DeleteCmt(req.body.comment_id);
}

exports.AddCol = async (req,res) => {
    let col = {
        board_id :ObjectId(req.body.board_id),
        column_name : req.body.column_name
    }
    const result = await boardModel.AddCols(col);
    res.send({comment_id:result.insertedId});
}

exports.DelCol = async (req,res) => {
   
    let cards = await boardModel.FindCards(req.body.column_id);

    //DELETE CARD AND BODY OF CARD
    if(cards && cards.length>0){
        for(let i = 0;i<cards.length;i++){
            await boardModel.DeleteCardByID(cards[i]._id);
            await boardModel.DeleteCmtByCardId(cards[i]._id);
            await boardModel.DeleteVoteByCardId(cards[i]._id);
        }
    }

    //delete col
    await boardModel.DeleteColsById(req.body.column_id);
}

exports.DeleteCard = async (req, res) => {

    await boardModel.DeleteCardByID(req.body.card_id);
    await boardModel.DeleteCmtByCardId(req.body.card_id);
    await boardModel.DeleteVoteByCardId(req.body.card_id);
}

exports.AddCard = async (req, res) => {

    let card = {
        column_id: ObjectId(req.body.column_id),
        card_name : req.body.card_name,
        card_owner : ObjectId(res.locals.user._id)
    }

    const result = await boardModel.AddCard(card);
    const user=  await userModels.getUser(res.locals.user._id);
    res.send({card_id:result.insertedId,card_owner:user.user_name});
}