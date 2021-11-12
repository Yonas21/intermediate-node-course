const express = require("express");
const mongoose = require("mongoose");

const User = require("./models/User");
const sendResponse = require("./config/response");

const port = 8000;
const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://localhost/userData")
  .then((message) => console.log("connected successfully"))
  .catch((err) => console.log("unable to connect to db", err));

// GET ALL USERS

app.get("/users", (req, res) => {
  User.find({}, { _id: 1, __v: 0 }, (err, data) => {
    sendResponse(res, err, data);
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
      sendResponse(res, err, data);
    }
  );
});

app
  .route("/users/:id")
  // READ
  .get((req, res) => {
    // User.findById()
    let id = req.params.id;
    User.findById(id, (err, data) => {
      sendResponse(res, err, data);
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
    User.findByIdAndDelete(id, (err, data) => {
      sendResponse(res, err, data);
    });
  });

app.listen(port, () => {
  console.log(`server is listening on port:${port}`);
});
