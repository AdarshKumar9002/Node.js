const bcrypt = require("bcryptjs");
const nodeMailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const User = require("../models/user");

const transporter = nodeMailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY
    },
  })
);

exports.getLogin = (request, response, next) => {
  let message = request.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  response.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: message,
  });
};

exports.getSignup = (request, response, next) => {
  let message = request.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  response.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    errorMessage: message,
  });
};

exports.postLogin = (request, response, next) => {
  const email = request.body.email;
  const password = request.body.password;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        request.flash("error", "Invalid email.");
        return response.redirect("/login");
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            request.session.isLoggedIn = true;
            request.session.user = user;
            return request.session.save((error) => {
              console.log(error);
              response.redirect("/");
            });
          }
          request.flash("error", "Invalid password.");
          response.redirect("/login");
        })
        .catch((error) => {
          console.log(error);
          response.redirect("/login");
        });
    })
    .catch((error) => console.log(error));
};

exports.postSignup = (request, response, next) => {
  const email = request.body.email;
  const password = request.body.password;
  const confirmPassword = request.body.confirmPassword;
  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        request.flash(
          "error",
          "E-Mail exists already, please pick a different email"
        );
        return response.redirect("/signup");
      }
      return bcrypt.hash(password, 12).then((hashedPassword) => {
        if (!hashedPassword) {
          return;
        }
        const user = new User({
          email: email,
          password: hashedPassword,
          cart: { items: [] },
        });
        return user.save();
      });
    })
    .then(() => {
      return transporter.sendMail({
        to: email,
        from: 'adarashkumar9002@gmail.com',
        subject: 'Signup succeeded!',
        html: '<h1> You successfully signup up! </h1>'
      })
    })
    .then(() => {
        response.redirect("/login");
    })
    .catch((error) => console.log(error));
};



exports.postLogout = (request, response, next) => {
  request.session.destroy((error) => {
    console.log(error);
    response.redirect("/");
  });
};
