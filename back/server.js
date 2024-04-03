const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userroutes = require("./routes/userRoutes");
const productroutes = require("./routes/productRoutes");
var cors = require("cors");
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use("/users", userroutes);
app.use("/products", productroutes);
app.listen(process.env.PORT, () => {
  console.log("Server is running on port:", process.env.PORT);
});
mongoose
  .connect(process.env.URL)
  .then(() => console.log("Connected to database!"))
  .catch((err) => console.error("Error connecting to database:", err));
