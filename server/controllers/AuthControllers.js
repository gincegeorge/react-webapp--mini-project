const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "this is the secret key", {
    expiresIn: maxAge,
  });
};

//ERROR HANDLING FUNCTION
const handleErrors = (err) => {
  let errors = { name: "", email: "", password: "" };

  if (err.message === "Incorrect email")
    errors.email = "Email is not registered";

  if (err.message === "Incorrect password")
    errors.email = "The password you entered is incorrect";

  if (err.code === 11000) {
    errors.email = "Email already exists";
    return errors;
  }
  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

//REGISTER
module.exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await UserModel.create({ name, email, password });
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });
    res.status(201).json({ user: user._id, created: true });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};

//LOGIN
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.login(email, password);
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });
    res.status(200).json({ user: user._id, created: true });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};
