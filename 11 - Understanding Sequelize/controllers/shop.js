const Product = require("../models/product");
const Cart = require("../models/cart");
const { where } = require("sequelize");
const Order = require("../models/order");

exports.getIndex = (request, response, next) => {
  Product.findAll()
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
  Product.findAll()
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
  /* Methoed 1 */
  // Product
  //   .findAll({ where: { id: prodId } })
  //   .then((product) => {
  //     response.render("shop/product-detail", {
  //       product: product[0],
  //       pageTitle: product[0].tittle,
  //       path: "/products",
  //     });
  //   })
  //   .catch((error) => console.log(error));

  /* Methoed 2 */
  Product.findByPk(prodId)
    .then((product) => {
      response.render("shop/product-detail", {
        product: product,
        pageTitle: product.tittle,
        path: "/products",
      });
    })
    .catch((error) => console.log(error));
};

exports.getCart = (request, response, next) => {
  request.user
    .getCart()
    .then((cart) => {
      return cart
        .getProducts()
        .then((products) => {
          response.render("shop/cart", {
            pageTitle: "Your Cart",
            path: "/cart",
            products: products,
          });
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};

exports.postCart = (request, response, next) => {
  const prodId = request.body.productId;
  let fetchedCart;
  let newQuantity = 1;

  request.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => response.redirect("/cart"))
    .catch((error) => console.log(error));
};

exports.postCartDelteProduct = (request, response, next) => {
  const prodId = request.body.productId;
  request.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      const product = products[0];
      product.cartItem.destroy();
    })
    .then(() => response.redirect("/cart"))
    .catch((error) => console.log(error));
};

exports.postOrder = (request, response, next) => {
  let fetchedCart;
  request.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      return request.user
        .createOrder()
        .then((Order) => {
          return Order.addProducts(
            products.map((product) => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        })
        .then(() => {
          return fetchedCart.setProducts(null);
        })
        .then(() => {
          response.redirect("/orders");
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};

exports.getOrders = (request, response, next) => {
  request.user
    .getOrders({include: ['products']})
    .then((orders) => {
      response.render("shop/orders", {
        pageTitle: "Your Orders",
        path: "/orders",
        orders: orders
      });
    })
    .catch((error) => console.log(error));
};
