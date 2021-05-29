if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const index = require("./routes/indexRoute");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", index);

app.use(errorHandler);

if (process.env.NODE_ENV == "production") {
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
}

module.exports = app;
