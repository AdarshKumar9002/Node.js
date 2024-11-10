const http = require('http');

const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('First Middleware');
    next();
})

app.use((req, res, next) => {
    console.log('second Middleware');
    res.send('<h1> Assignment: 2<sup>nd</sup> Question</h1>');
})

app.listen(3000);