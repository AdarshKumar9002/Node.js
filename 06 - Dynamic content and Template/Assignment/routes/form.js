const path = require('path');
const express = require('express');

const router = express.Router();

const userNames = [];

router.get('/', (req, res) => {
    res.render('form', {pageTitle: 'Form', path: '/'})
})

router.post('/add-name', (req, res) => {
    userNames.push({name: req.body.username});
    res.redirect('/users');
})

exports.routes = router;
exports.userNames = userNames;