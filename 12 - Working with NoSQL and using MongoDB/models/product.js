const mongodb = require("mongodb");
const { ObjectId } = require("mongodb");
const getDb = require("../util/database").getDb;

class Product {
  constructor(title, price, imageUrl, description, id, userid) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this._id = id ?  new ObjectId(id) : null;
    this.userid = userid ;
  }
  save() {
    const db = getDb();
    let dbOp;

    if (this._id) {
      dbOp = db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection("products").insertOne(this);
    }
    return dbOp
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        return products;
      })
      .catch((error) => console.log(error));
  }

  static findById(prodId) {
    const db = getDb();
    

    return db
      .collection("products")
      .find({ _id: new ObjectId(prodId) })
      .next()
      .then((product) => {
        return product;
      })
      .catch((error) => console.log(error));
  }

  static deleteById(prodId) {
    const db = getDb();
    return db.collection("products")
      .deleteOne({ _id: new ObjectId(prodId) })
      .then(() => console.log("deleted"))
      .catch((error) => console.log(error));
  }
}

module.exports = Product;

      