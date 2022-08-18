const db = require("./../configuration/dbConfig");
/*class Product {
  constructor(category, price, stock) {
    this._category = category;
    this._price = price;
    this._stock = stock;
  }

  set category(category) {
    this._category = category;
  }

  get category() {
    return this._category;
  }

  set price(price) {
    this._price = price;
  }

  get price() {
    return this._price;
  }

  set stock(stock) {
    this._stock = stock;
  }

  get stock() {
    return this._stock;
  }
}*/

const Product = db.collection("Products");

module.exports = Product;
