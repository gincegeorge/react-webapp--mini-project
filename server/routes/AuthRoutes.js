const { register, login } = require("../controllers/userAuthControllers");
const {
  adminRegister,
  adminlogin,
} = require("../controllers/adminAuthControllers");
const { checkUser } = require("../middlewares/AuthMiddlewares");
const { UserList } = require("../controllers/adminControllers");

const router = require("express").Router();

router.post("/", checkUser);
router.post("/register", register);
router.post("/login", login);
// router.post("/admin-register", adminRegister);
router.post("/admin/login", adminlogin);
router.get("/admin/users", UserList);

module.exports = router;
