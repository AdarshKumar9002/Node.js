pageNotFound = (request, response, next) => {
  response.status(404).render("404", { pageTitle: "Page Not Found", path: "" });
};

module.exports = pageNotFound;
