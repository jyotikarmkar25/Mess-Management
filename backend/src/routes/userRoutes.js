const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");


// 🟢 Admin: Get All Users
router.get("/all", protect, getAllUsers);


// 🟢 Admin: Get Single User
router.get("/:id", protect, getUserById);


// 🟢 Admin: Update User
router.put("/update/:id", protect, updateUser);


// 🟢 Admin: Delete User
router.delete("/delete/:id", protect, deleteUser);


module.exports = router;