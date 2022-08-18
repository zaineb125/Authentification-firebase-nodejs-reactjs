const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const authRouter = require("./routes/authRoutes");
const productRouter = require("./routes/productRoutes");
const cors = require("cors");

const app = express();

//Middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); //To parse cookies from the http request

//routes
app.use("/auth", authRouter);
app.use("/products", productRouter);

//app Listening
app.listen(3000, () => {
  console.log("Listening on port 3000 !");
});

module.exports = app;
