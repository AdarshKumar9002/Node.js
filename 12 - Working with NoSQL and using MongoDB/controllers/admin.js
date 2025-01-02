
const Product = require("../models/product");

exports.getAddProduct = (request, response, next) => {
  response.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
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
      });
    })
    .catch((error) => console.log(error));
};

exports.postAddProduct = (request, response, next) => {
  const title = request.body.title;
  const price = request.body.price;
  const imageUrl = request.body.imageUrl;
  const description = request.body.description;
  const product = new Product(title, price, imageUrl, description, null, request.user._id);
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

  const product = new Product(
    updadatedTitle,
    updadatedPrice,
    updadatedImageUrl,
    updadatedDescription,
    prodId
  );
  product
    .save()
    .then(() => {
      console.log("updated Product");
      response.redirect("/admin/products");
    })
    .catch((error) => console.log(error));
};

exports.getProducts = (request, response, next) => {
  Product.fetchAll()
    .then((products) => {
      response.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((error) => console.log(error));
};

exports.postDeleteProduct = (request, response, next) => {
  const prodId = request.body.productId;
  Product.deleteById(prodId)
    .then(() => {
      response.redirect("/admin/products");
    })
    .catch((error) => console.log(error));
};
