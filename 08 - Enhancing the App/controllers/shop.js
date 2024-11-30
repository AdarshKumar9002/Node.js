const Product = require("../models/product");


exports.getIndex = (request, response, next) => {
  Product.fetchAll((products) => {
    response.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};


exports.getProducts = (request, response, next) => {
  Product.fetchAll((products) => {
    response.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};


exports.getCart = (request, response, next) => {
  response.render("shop/cart", {
    pageTitle: "Cart",
    path: "/cart",
  });
};

exports.getOrders = (request, response, next) => {
  response.render("shop/orders", {
    pageTitle: "Your Orders",
    path: "/orders",
  });
};

exports.getCheckout = (request, response, next) => {
  response.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};

// exports.getProductDetail = (request, response, next) => {
//   response.render("shop/product-detail", {
//     pageTitle: "Product Detail",
//     path: "/product-detail",
//   });
// };