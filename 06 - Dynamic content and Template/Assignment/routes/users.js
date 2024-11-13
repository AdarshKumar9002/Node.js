const path = require('path');
const express = require('express');

const userData = require('./form');

const router = express.Router();

router.get('/users', (req, res) => {
    const names = userData.userNames;
    res.render('user', {pageTitle: 'User', userNames: names, path: '/users'});
})

module.exports = router;