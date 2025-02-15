pageNotFound = (request, response, next) => {
  response
    .status(404)
    .render("404", {
      pageTitle: "Page Not Found",
      path: "",
      isAuthenticated: request.session.isLoggedIn,
    });
};

module.exports = pageNotFound;
