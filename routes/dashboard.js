const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

/* GET home page. */
router.get('/',  dashboardController.index);
router.post('/current-board',  dashboardController.getCurrentBoard);
router.post('/create-board',  dashboardController.AddBoard);
router.post('/delete-board',  dashboardController.DeleteBoard);
module.exports = router;
