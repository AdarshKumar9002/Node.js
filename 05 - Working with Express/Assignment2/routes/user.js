const path = require('path');
const express = require('express');
const exp = require('constants');

const rootDir = require('../utils/path');

const router = express.Router();


router.get('/user', (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'user.html'));
})

module.exports = router;