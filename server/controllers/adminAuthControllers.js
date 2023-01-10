const AdminModel = require("../models/AdminModel");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;

//CREATE JWT TOKEN
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

//REGISTER ADMIN
// module.exports.adminRegister = async (req, res, next) => {
//   try {
//     email = req.query.email;

//     password = req.query.password;

//     const admin = await AdminModel.create({ email, password });

//     res.status(201).json({ admin: admin._id, created: true });
//   } catch (err) {
//     console.log(err);
//     res.json({ created: false });
//   }
// };

//LOGIN ADMIN
module.exports.adminlogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const admin = await AdminModel.login(email, password);
    const token = createToken(admin._id);

    res.cookie("jwtAdmin", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });

    res.status(200).json({ admin: admin._id, created: true });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};


