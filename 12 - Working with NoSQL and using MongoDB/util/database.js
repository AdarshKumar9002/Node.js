const mongodb = require("mongodb");

const MongoClint = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClint.connect(
    "mongodb+srv://Adarsh:RYQ2dYFw5YOzCqof@cluster0.6x4x0.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0"
  )
    .then((clint) => {
      _db = clint.db();
      callback();
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

const getDb = () => {
  if(_db) {
    return _db;
  }
  throw 'No Database Found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
