const products = require("./routes/products");
const card = require("./routes/card");

const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://testM:testM@clustertest.qeyif.mongodb.net/testm?retryWrites=true",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());

app.use(cors());
app.options("*", cors());

app.use("/products", products);
app.use("/card", card);

const port = 5000;
http.listen(port, () => console.log(`Listening on port ${port}...`));
