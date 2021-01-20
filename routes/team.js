const express = require('express');
const { route } = require('.');
const router = express.Router();
const teamController = require('../controllers/teamController');

/* GET home page. */
router.get('/', teamController.index);
router.post('/addMem', teamController.addMem);
router.post('/addTeam', teamController.addTeam);
router.post('/delTeam', teamController.delTeam);
router.post('/delMem', teamController.delMem);
router.post('/leaTeam', teamController.leaTeam);
router.post('/delTeamBoard',teamController.delTeamBoard);

module.exports = router;