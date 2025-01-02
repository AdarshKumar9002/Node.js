const Product = require("../models/product");

exports.getIndex = (request, response, next) => {
  Product.fetchAll()
    .then((products) => {
      response.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((error) => console.log(error));
};

exports.getProducts = (request, response, next) => {
  Product.fetchAll()
    .then((products) => {
      response.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((error) => console.log(error));
};

exports.getProductDetail = (request, response, next) => {
  const prodId = request.params.productId;
  console.log(request.params);

  console.log(
    `Request URL: ${request.url}, Method: ${request.method}, Product ID: ${prodId}`
  );

  Product.findById(prodId)
    .then((product) => {
      response.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((error) => console.log(error));
};

exports.getCart = (request, response, next) => {
  request.user
    .getCart()
    .then((products) => {
      response.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
        products: products,
      });
    })
    .catch((error) => console.log(error));
};

exports.postCart = (request, response, next) => {
  const prodId = request.body.productId;
  Product.findById(prodId)
    .then((product) => {
      return request.user.addToCart(product);
    })
    .then((result) => response.redirect("/cart"));
};

exports.postCartDelteProduct = (request, response, next) => {
  const prodId = request.body.productId;
  request.user
    .deleteItemFromCart(prodId)
    .then(() => response.redirect("/cart"))
    .catch((error) => console.log(error));
};

exports.postOrder = (request, response, next) => {
  let fetchedCart;
  request.user
    .addOrder()
    .then(() => {
      response.redirect("/orders");
    })
    .catch((error) => console.log(error));
};

exports.getOrders = (request, response, next) => {
  request.user
    .getOrders()
    .then((orders) => {
      response.render("shop/orders", {
        pageTitle: "Your Orders",
        path: "/orders",
        orders: orders,
      });      
    })
    .catch((error) => console.log(error));
};
