const express = require('express');
const playerController = require('../controllers/player');
const router = express.Router();

router.post('/summary', playerController.submit);

router.post('/leaderboard',playerController.leaderboard)


router.get('/leaderboard',playerController.getleaderboard)
module.exports = router;
