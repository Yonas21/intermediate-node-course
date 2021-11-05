const express = require("express");
const mongoose = require("mongoose");

const User = require("./models/User");

const port = 8000;
const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://localhost/userData")
  .then((message) => console.log("connected successfully"))
  .catch((err) => console.log("unable to connect to db", err));

// GET ALL USERS

app.get("/users", (req, res) => {
  User.find({}, { _id: 1, __v: 0 })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// CREATE
app.post("/users", (req, res) => {
  // User.create()
  const { name, email, password } = req.body;
  User.create(
    {
      name,
      email,
      password,
    },
    (err, data) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: err,
        });
      } else if (!data) {
        res.status(404).json({ success: false, message: "Not Found" });
      } else {
        res.status(201).json({
          success: true,
          data,
        });
      }
    }
  );
});

app
  .route("/users/:id")
  // READ
  .get((req, res) => {
    // User.findById()
    let id = req.params.id;
    User.findById(id)
      .then((result) => {
        res.status(200).json({
          result,
          message: "success",
        });
      })
      .catch((err) => {
        res.status(404).json({
          message: `unable to find data with id ${id} `,
          err,
        });
      });
  })
  // UPDATE
  .put((req, res) => {
    // User.findByIdAndUpdate()
    let id = req.params.id;
    const { name, email, password } = req.body.newData;
    User.findByIdAndUpdate(id, { name, email, password }, { new: true })
      .then((result) => {
        res.status(200).json({
          message: "user successfully updated",
          result,
        });
      })
      .catch((err) => {
        res.status(404).json({
          message: `unable to update user with id ${id}`,
          err,
        });
      });
  })
  // DELETE
  .delete((req, res) => {
    // User.findByIdAndDelete()
    let id = req.params.id;
    User.findByIdAndDelete(id)
      .then((result) => {
        res.status(200).json({
          message: `user with id ${id}`,
          result,
        });
      })
      .catch((err) => {
        res.status(404).json({ message: `unable to delete user`, err });
      });
  });

app.listen(port, () => {
  console.log(`server is listening on port:${port}`);
});
