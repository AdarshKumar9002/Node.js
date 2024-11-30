const Product = require("../models/product");

exports.getAddProduct = (request, response, next) => {
  response.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (request, response, next) => {
  const title = request.body.title;
  const imageUrl = request.body.imageUrl;
  const description = request.body.description;
  const price = request.body.price;
  
  const product = new Product(title, imageUrl, description, price);
  product.save();
  response.redirect("/");
};

exports.getProducts = (request, response, next) => {
  Product.fetchAll((products) => {
    response.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};
