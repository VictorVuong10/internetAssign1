const express = require('express');
const peopleController = require('../controllers/people');
const router = express.Router();

router.get('/peoples', peopleController.getAllPeople);

router.get('/people/add', peopleController.getAddPeople);

router.get('/people/:id', peopleController.getPeople);

router.post('/peoples/add', peopleController.postAddPeople)

module.exports = router;
