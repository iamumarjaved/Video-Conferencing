const express = require('express');
const sessionController = require('../controllers/sessionController');
const router = express.Router();

router.post('/create-room', sessionController.createRoom);
router.post('/join-room', sessionController.joinRoom);

module.exports = router;
