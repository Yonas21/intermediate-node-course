const express = require("express");
const mongoose = require("mongoose");

const User = require("./models/User");

const port = 8000;
const app = express();

app.use(express.json());

app.listen(port, () => {
  console.log(`server is listening on port:${port}`);
});

mongoose.connect("mongodb://localhost/userData");

// CREATE
app.post("/users", (req, res) => {
  // User.create()
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });
  user
    .save()
    .then((result) => {
      return res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

app
  .route("/users/:id")
  // READ
  .get((req, res) => {
    // User.findById()
  })
  // UPDATE
  .put((req, res) => {
    // User.findByIdAndUpdate()
  })
  // DELETE
  .delete((req, res) => {
    // User.findByIdAndDelete()
  });
