const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const rootDir = require('./utils/path');
const homeRouters = require('./routes/home');
const userRouters = require('./routes/user');

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(homeRouters);
app.use(userRouters);


app.use((req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'page-not-found.html'));
})

app.listen(3000);