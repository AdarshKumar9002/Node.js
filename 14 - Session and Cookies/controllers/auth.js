const User = require("../models/user");

exports.getLogin = (request, response, next) => {
  response.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

exports.postLogin = (request, response, next) => {
  User.findById("677981d9a4c6a542e34ad309")
    .then((user) => {
      request.session.isLoggedIn = true;
      request.session.user = user;
      request.session.save((error) => {
        console.log(error);
        response.redirect("/");
      });
    })
    .catch((error) => console.log(error));
};

exports.postLogout = (request, response, next) => {
  request.session.destroy((error) => {
    console.log(error);
    response.redirect("/");
  });
};
