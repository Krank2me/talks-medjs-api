const { Router } = require('express');
const addTalk = require('../controllers/addTalk');

const router = Router();

router.post('/add', addTalk)

module.exports = router;