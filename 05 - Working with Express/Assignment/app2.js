const http = require('http');

const express = require('express');

const app = express();

app.use('/user',(req, res, next) => {
    res.send('<h1> Assignment: 3<sup>rd</sup> Question</h1> <h2> Route: /user</h2>');
})

app.use('/',(req, res, next) => {
    res.send('<h1> Assignment: 3<sup>rd</sup> Question</h1> <h2> Route: /</h2>');
})

app.listen(3000);