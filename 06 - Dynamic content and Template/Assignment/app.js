const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const formRoute = require('./routes/form');
const userRoute = require('./routes/users');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(formRoute.routes);
app.use(userRoute);

app.use((req, res) => {
    res.status(404).render('404', {pageTitle: 'Page Not Found',  path: ''});
})

app.listen(5000);