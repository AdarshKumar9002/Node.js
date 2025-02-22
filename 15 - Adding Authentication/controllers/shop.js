const Order = require("../models/order");
const Product = require("../models/product");

exports.getIndex = (request, response, next) => {
  Product.find()
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
  Product.find()
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
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items;
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
    .then(() => response.redirect("/cart"));
};

exports.postCartDeleteProduct = (request, response, next) => {
  const prodId = request.body.productId;
  console.log(request.user);
  request.user
    .removeFromCart(prodId)
    .then(() => response.redirect("/cart"))
    .catch((error) => console.log(error));
};

exports.postOrder = (request, response, next) => {
  request.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items.map((i) => {
        return { quantity: i.quantity, productData: { ...i.productId._doc } };
      });

      const order = new Order({
        user: {
          email: request.user.email,
          userId: request.user,
        },
        products: products,
      });
      return order.save();
    })
    .then(() => {
      return request.user.clearCart();
    })
    .then(() => {
      response.redirect("/orders");
    })
    .catch((error) => console.log(error));
};

exports.getOrders = (request, response, next) => {
  Order.find({ "user.userId": request.user._id })
    .then((orders) => {
      response.render("shop/orders", {
        pageTitle: "Your Orders",
        path: "/orders",
        orders: orders,
      });
    })
    .catch((error) => console.log(error));
};
