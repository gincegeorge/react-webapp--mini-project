const { verify } = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

//USERLIST
module.exports.UserList = async (req, res, next) => {
  await UserModel.find()
    .then((result) => res.status(200).json({ users: result }))
    .catch((err) => res.json({ error: err.message }));
};
// }
