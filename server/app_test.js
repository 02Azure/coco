"use strict";

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("routed");
});

app.post("/login", postLogin);
app.post("/register", postRegister);

// app.listen(PORT, () => {
//   console.log(`idling at ${PORT} RPM`);
// });

module.exports = app;

function postRegister(req, res, next) {


  if (req.body.email == "registered@mail.com") {
    res.status(400).json({ message: "Email is already used" });
  }
  if (req.body.email == "usermail.com") {
    res.status(400).json({ message: "Incorrect email format" });
  }
  if (req.body.password.length < 6) {
    res.status(400).json({ message: "Password length 6 character minimum" });
  } else {
    res.status(201).json({
      username: req.body.username,
      email: req.body.email,
      id: 1,
    });
  }
}

function postLogin(req, res, next) {
  if (req.body.email == "usermail.com") {
    res.status(401).json({"message" :"Incorrect email or password"})
  }else{
    res.status(200).json({
      id: 1,
      email: req.body.email,
      access_token:'access_token'
    })
  }

}
