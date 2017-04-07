'use strict';

const express = require('express');
const contacts = require('./rutes/contacts');
const router = express.Router();

router.use('/api/v1/', contacts);

module.exports = router;
