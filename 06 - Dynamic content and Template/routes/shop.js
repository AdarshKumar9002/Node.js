const path = require("path");
const express = require("express");
const router = express.Router();

const adminData = require("./admin");

router.get("/", (request, response) => {
  const products = adminData.products;
  response.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
    productsCss: true,
    hasProducts: products.length > 0,
    activeShop: true
  });
});

module.exports = router;
