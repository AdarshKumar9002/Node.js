const path = require('path');
const http = require("http");
const bodyParser = require('body-parser')

const express = require('express');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use((reqest, response, next) => {
    response.status(404).sendFile(path.join(__dirname, 'views', 'page-not-found.html'));

})

app.listen(3000);
