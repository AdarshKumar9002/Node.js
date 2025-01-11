const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const pageNotFoundController = require("./controllers/404");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use((request, response, next) => {
  User.findById("677981d9a4c6a542e34ad309")
    .then((user) => {
      request.user = user;
      next();
    })
    .catch((error) => console.log(error));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(pageNotFoundController);

mongoose
  .connect(
    "mongodb+srv://Adarsh:RYQ2dYFw5YOzCqof@cluster0.6x4x0.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: "Adarsh",
          email: "adarsh@test.com",
          cart: { items: [] },
        });
        user.save();
      }
    });
  })
  .then(() => app.listen(3000))
  .catch((error) => console.log(error));
