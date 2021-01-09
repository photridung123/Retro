const { db } = require('../db/db');
const { ObjectId } = require('mongodb');
const TBL_BOARD = 'tbl_boards'
const TBL_COLUMNS = 'tbl_columns'
const TBL_CARDS = 'tbl_cards'
const TBL_VOTE = 'tbl_vote'
const TBL_COMMENT = 'tbl_comment'

exports.FindBoards = async (owner_id, board_type) => {
    const boardCollection = db().collection(TBL_BOARD);
    const boards = await boardCollection.find({
        $and: [
            { owner_id: ObjectId(owner_id) },
            { board_type: board_type }
        ]
    }).toArray();
    return boards;
}

exports.FindColumns = async (board_id) => {
    const columnCollection = db().collection(TBL_COLUMNS);
    const columns = await columnCollection.find({ board_id: ObjectId(board_id) }).toArray();
    return columns;
}

exports.FindCards = async (column_id) => {
    const cardCollection = db().collection(TBL_CARDS);
    const cards = await cardCollection.find({ column_id: ObjectId(column_id) }).toArray();
    return cards;
}

exports.AddBoards = async (board) => {

    const boardCollection = db().collection(TBL_BOARD);
    const result = await boardCollection.insertOne(board);
    return result;
}

exports.AddCol = async (col) => {

    const columnCollection = db().collection(TBL_COLUMNS);
    await columnCollection.insertOne(col);
}

exports.FindBoardByBoardId = async (board_id) => {
    const boardCollection = db().collection(TBL_BOARD);
    const boards = await boardCollection.findOne({ _id: ObjectId(board_id) });
    return boards;
}

exports.DeleteBoard = async (board_id) => {
    const boardCollection = db().collection(TBL_BOARD);
    await boardCollection.deleteOne({ _id: ObjectId(board_id) });
}

exports.DeleteCols = async (board_id) => {
    const columnCollection = db().collection(TBL_COLUMNS);
    columnCollection.deleteMany({ board_id: ObjectId(board_id) });
}

exports.DeleteCards = async (col_id) => {
    const cardCollection = db().collection(TBL_CARDS);
    cardCollection.deleteMany({ column_id: ObjectId(col_id) });
}

exports.GetVoteByUserID = async (user_id) => {
    const voteCollection = db().collection(TBL_VOTE);
    const votes = await voteCollection.find({ vote_owner: ObjectId(user_id) }).toArray();
    return votes;
}

exports.FindVotes = async (card_id) => {
    const voteCollection = db().collection(TBL_VOTE);
    const votes = await voteCollection.find({ card_id: ObjectId(card_id) }).toArray();
    return votes;
}

exports.FindComments = async (card_id) => {
    const commentCollection = db().collection(TBL_COMMENT);
    const comments = await commentCollection.find({ card_id: ObjectId(card_id) }).toArray();
    return comments;
}

exports.AddComment = async (cmt) => {
    const commentCollection = db().collection(TBL_COMMENT);
    await commentCollection.insertOne(cmt);
}

exports.DeleteCmt = async (comment_id) => {
    const commentCollection = db().collection(TBL_COMMENT);
    await commentCollection.deleteOne({_id:ObjectId(comment_id)});
}

exports.DeleteVote = async (card_id,vote_owner) => {
    const voteCollection = db().collection(TBL_VOTE);
    await voteCollection.deleteOne({
        $and: [
            { card_id: ObjectId(card_id) },
            { vote_owner: ObjectId(vote_owner) }
        ]
    });
}

exports.AddVote = async (vote) => {
    const voteCollection = db().collection(TBL_VOTE);
    await voteCollection.insertOne(vote);
}