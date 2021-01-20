const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');

/* GET home page. */
router.get('/:id', boardController.index);
router.post('/:id/add-cmt', boardController.AddCmt);
router.post('/:id/vote', boardController.Vote);
router.post('/:id/delete-cmt', boardController.DeleteCmt);
router.post('/:id/delete-card', boardController.DeleteCard);
router.post('/:id/add-card', boardController.AddCard);
router.post('/:id/add-column', boardController.AddCol);
router.post('/:id/delete-column', boardController.DelCol);
router.post('/:id/update-drag-drop',boardController.UpdateDragDrop);
module.exports = router;
