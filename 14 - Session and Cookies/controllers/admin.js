const Product = require("../models/product");

exports.getAddProduct = (request, response, next) => {
  response.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    isAuthenticated: request.session.isLoggedIn
  });
};

exports.getEditProduct = (request, response, next) => {
  const editMode = request.query.edit;
  if (!editMode) {
    return response.redirect("/");
  }
  const productId = request.params.productId;

  Product.findById(productId)
    .then((product) => {
      if (!product) {
        return response.redirect("/");
      }
      response.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
        isAuthenticated: request.session.isLoggedIn
      });
    })
    .catch((error) => console.log(error));
};

exports.postAddProduct = (request, response, next) => {
  const title = request.body.title;
  const price = request.body.price;
  const imageUrl = request.body.imageUrl;
  const description = request.body.description;
  const product = new Product({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
    userId: request.user
  });
  product
    .save()
    .then(() => response.redirect("/admin/products"))
    .catch((error) => console.log(error));
};

exports.postEditProduct = (request, response, next) => {
  const prodId = request.body.productId;
  const updadatedTitle = request.body.title;
  const updadatedImageUrl = request.body.imageUrl;
  const updadatedPrice = request.body.price;
  const updadatedDescription = request.body.description;

  Product.findById(prodId)
    .then((product) => {
      product.title = updadatedTitle;
      product.price = updadatedPrice;
      product.imageUrl = updadatedImageUrl;
      product.description = updadatedDescription;
      return product.save();
    })
    .then(() => {
      console.log("updated Product");
      response.redirect("/admin/products");
    })
    .catch((error) => console.log(error));
};

exports.getProducts = (request, response, next) => {
  Product.find()
    .then((products) => {
      response.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
        isAuthenticated: request.session.isLoggedIn
      });
    })
    .catch((error) => console.log(error));
};

exports.postDeleteProduct = (request, response, next) => {
  const prodId = request.body.productId;
  Product.findByIdAndDelete(prodId)
    .then(() => {
      response.redirect("/admin/products");
    })
    .catch((error) => console.log(error));
};
