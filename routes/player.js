const express = require('express');
const playerController = require('../controllers/player');
const router = express.Router();

router.post('/summary', playerController.submit);

router.post('/leaderboard',playerController.leaderboard)

// router.get('/people/add', peopleController.getAddPeople);

// router.get('/people/:id', peopleController.getPeople);

// router.post('/peoples/add', peopleController.postAddPeople)

// router.get('/getPlayer', playerController.getPlayer);

module.exports = router;
