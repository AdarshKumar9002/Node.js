const Product = require("../models/product");

exports.getAddProduct = (request, response, next) => {
  response.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (request, response, next) => {
  const product = new Product(request.body.title);
  product.save();
  response.redirect("/");
};

exports.getProducts = (request, response, next) => {
  Product.fetchAll((products) => {
    response.render("shop", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};
