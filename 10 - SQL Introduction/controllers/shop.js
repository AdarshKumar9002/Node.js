const Product = require("../models/product");
const Cart = require("../models/cart");
exports.getIndex = (request, response, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      response.render("shop/index", {
        prods: rows,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((error) => console.log(error));
};

exports.getProducts = (request, response, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      response.render("shop/product-list", {
        prods: rows,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((error) => console.log(error));
};

exports.getProductDetail = (request, response, next) => {
  const prodId = request.params.productId;
  Product.findById(prodId).then(([product]) => {
    response.render("shop/product-detail", {
      product: product[0],
      pageTitle: product.tittle,
      path: "/products",
    });
  }).catch(error => console.log(error)
);
};

exports.getCart = (request, response, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (let product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      response.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
        products: cartProducts,
      });
    });
  });
};

exports.postCart = (request, response, next) => {
  const prodId = request.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  console.log(prodId);
  response.redirect("/cart");
};

exports.postCartDelteProduct = (request, response, next) => {
  const prodId = request.body.productId;
  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    response.redirect("/cart");
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
