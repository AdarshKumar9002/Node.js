
const Product = require("../models/product");

exports.getAddProduct = (request, response, next) => {
    response.render("admin/edit-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false
    });
};

exports.getEditProduct = (request, response, next) => {
  const editMode = request.query.edit;
  if (!editMode) {     
    return response.redirect("/");
  }
  const productId = request.params.productId;
  Product.findById(productId, (product) => {
    if(!product) {   
      return response.redirect('/');
    }
    response.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product
    });
  });
};

exports.postAddProduct = (request, response, next) => {
  const title = request.body.title;
  const imageUrl = request.body.imageUrl;
  const description = request.body.description;
  const price = request.body.price;

  const product = new Product(null, title, imageUrl, description, price);
  product.save().then(() => {response.redirect('/')}).catch(error => console.log(error)
  );
  response.redirect("/");
};

exports.postEditProduct = (request, response, next) => {
const prodId = request.body.productId;
const updadatedTitle = request.body.title;
const updadatedImageUrl = request.body.imageUrl;
const updadatedPrice = request.body.price;
const updadatedDescription = request.body.description;
const updatedProduct = new Product(prodId, updadatedTitle, updadatedImageUrl, updadatedDescription, updadatedPrice);

updatedProduct.save();
response.redirect('/admin/products');
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

exports.postDeleteProduct = (request, response, next) => {
  const prodId = request.body.productId;
  Product.deleteById(prodId);
  response.redirect('/admin/products');
}