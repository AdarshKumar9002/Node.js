require("dotenv").config();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const flash = require("connect-flash");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const pageNotFoundController = require("./controllers/404");
const User = require("./models/user");

const MONGODB_URI =
  "mongodb+srv://Adarsh:RYQ2dYFw5YOzCqof@cluster0.6x4x0.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0";

const app = express();
const csrfProtection = csrf();

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "session",
});

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(csrfProtection);
app.use(flash());
app.use((request, response, next) => {
  if (!request.session.user) {
    return next();
  }
  User.findById(request.session.user._id)
    .then((user) => {
      request.user = user;
      next();
    })
    .catch((error) => console.log(error));
});

app.use((request, response, next) => {
  response.locals.isAuthenticated = request.session.isLoggedIn;
  response.locals.csrfToken = request.csrfToken();
  next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(pageNotFoundController);

mongoose
  .connect(MONGODB_URI)
  .then(() => app.listen(3000))
  .catch((error) => console.log(error));
