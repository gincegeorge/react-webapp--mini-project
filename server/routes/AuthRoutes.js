const { register, login } = require("../controllers/userAuthControllers");
const {
  adminRegister,
  adminlogin,
} = require("../controllers/adminAuthControllers");
const { checkUser } = require("../middlewares/AuthMiddlewares");
const { UserList, editUser, postEditUser, deleteUser } = require("../controllers/adminControllers");

const router = require("express").Router();

router.post("/", checkUser);
router.post("/register", register);
router.post("/login", login);

// router.post("/admin-register", adminRegister);
router.post("/admin/login", adminlogin);
router.get("/admin/users", UserList);
router.get("/admin/users/edit/:id", editUser);

router.post("/admin/users/edit/:id",postEditUser );
router.post('/admin/users/delete/:id',deleteUser)

module.exports = router;
