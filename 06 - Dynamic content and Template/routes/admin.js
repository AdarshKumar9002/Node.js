const path = require("path");
const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();

const products = [];

router.get("/add-product", (request, response) => {
  response.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    productsCSS: true,
    formsCSS: true,
    activeAddProducts: true
  });
});

router.post("/add-product", (request, response) => {
  products.push({ title: request.body.title });
  response.redirect("/");
});

exports.routes = router;
exports.products = products;
