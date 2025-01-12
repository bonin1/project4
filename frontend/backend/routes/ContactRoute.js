const express = require('express');
const router = express.Router();
const submitContact = require('../controllers/Contact/SubmitContact');

router.post('/submit', submitContact);

module.exports = router;
