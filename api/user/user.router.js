const { createUsers, deleteUser, updateUser, getUserById, getAllUsers, login } = require("./user.controller")
const router = require('express').Router()

const { checkToken } = require("../../auth/token_validation")


router.post("/", checkToken, createUsers);
router.get("/", checkToken, getAllUsers);

router.get("/:id", checkToken, getUserById);

router.patch("/", checkToken, updateUser);

router.delete("/:id", checkToken, deleteUser);
router.post("/login", login);


module.exports = router 
