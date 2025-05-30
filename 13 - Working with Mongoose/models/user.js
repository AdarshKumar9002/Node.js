const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          require: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

userSchema.methods.addToCart = function (product) {
  const cartProductsIndex = this.cart.items.findIndex((cp) => {
    return cp.productId.toString() === product._id.toString();
  });
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductsIndex >= 0) {
    newQuantity = this.cart.items[cartProductsIndex].quantity + 1;
    updatedCartItems[cartProductsIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity,
    });
  }
  const updatedCart = {
    items: updatedCartItems,
  };

  this.cart = updatedCart;

  return this.save();
};


userSchema.methods.clearCart = function (productId) {
  this.cart = {items: []};
  return this.save();
}

module.exports = mongoose.model("User", userSchema);
