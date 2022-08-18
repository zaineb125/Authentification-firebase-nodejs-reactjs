const Product = require("./../model/Product");
const db = require("./../configuration/dbConfig");
const { check, validationResult } = require("express-validator");

exports.createProduct = async (req, res) => {
 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    for (let i = 0; i < errors.errors.length; i++)
      return res.status(400).json({ msg: errors.errors[i].msg });
  }
  const { name, category, price, stock } = req.body;
  const product = await Product.where("name", "==", name).get();
  if (product.empty) {
    Product.doc()
      .set({
        name: name,
        category: category,
        price: price,
        stock: stock,
      })
      .then(() => {
        res.send("Product successfully created !");
      });
  } else {
    res.send("Product does exist !");
  }
};

exports.updateProduct = async (req, res) => {
  const pName = req.params.name;
  const { name, category, price, stock } = req.body;
  const product = await Product.where("name", "==", name).get();
  var productId;
  db.collection("users").get();

  await Product.where("name", "==", pName)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        productId = doc.id;
      });
    });

  if (productId) {
    if (product.empty) {
      await Product.doc(productId)
        .update({
          name: name,
          category: category,
          price: price,
          stock: stock,
        })
        .then(() => {
          res.send({
            message: "Product updated !",
          });
        });}
        else{
          res.send({
            message: "Product already exist choose another name !",
          });
        }
  } else {
    res.send({
      message: "Product does not exist !",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  const pName = req.params.name;
  var productId;
  await Product.where("name", "==", pName)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        productId = doc.id;
      });
    });
  await Product.doc(productId)
    .delete()
    .then(() => {
      res.send({
        message: "Product deleted",
      });
    });
};
