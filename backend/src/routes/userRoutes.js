const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/adminUserController");

const { protect, admin } = require("../middleware/authMiddleware");

// Get All Users
router.get("/", protect, admin, getAllUsers);

// Get User By ID
router.get("/:id", protect, admin, getUserById);

// Update User
router.put("/:id", protect, admin, updateUser);

// Delete User
router.delete("/:id", protect, admin, deleteUser);

module.exports = router;