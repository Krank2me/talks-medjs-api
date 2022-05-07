const { Router } = require('express');
const addTalk = require('../controllers/addTalk');

const router = Router();

router.post('/addTalk', addTalk)

module.exports = router;