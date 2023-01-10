const { verify } = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

//USERLIST
module.exports.UserList = async (req, res, next) => {
  await UserModel.find()
    .then((result) => res.status(200).json({ users: result }))
    .catch((err) => res.json({ error: err.message }));
};

//GET EDIT USER
module.exports.editUser = async (req, res) => {
  let userId = req.params.id;
  await UserModel.findOne({ _id: userId })
    .then((result) => {
      res.status(200).json({ user: result });
    })
    .catch((err) => {
      res.json({ error: err.mssage });
    });
};

//POST EDIT USER
module.exports.postEditUser = async (req, res) => {
  let userId = req.params.id;
  console.log(req.body);
  await UserModel.findOneAndUpdate(
    { _id: userId },
    { email: req.body.email, name: req.body.name }
  )
    .then((result) => res.status(200).json({ status: true }))
    .catch((err) => res.json({ error: err.message, status: false }));
};

// DELETE USER
module.exports.deleteUser = async (req, res) => {
  let userId = req.params.id;
  console.log(userId);
  await UserModel.deleteOne({ _id: userId })
    .then((result) => {
      res.status(200).json({ status: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
};
