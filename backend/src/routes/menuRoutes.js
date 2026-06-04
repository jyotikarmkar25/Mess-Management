const express = require("express");
const router = express.Router();

const {
  createMenu,
  getTodayMenu,
  getAllMenus,
  updateMenu,
  deleteMenu,
} = require("../controllers/menuController");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");


// 🟢 Admin: Create Menu (with image upload)
router.post("/create", protect, upload.single("image"), createMenu);


// 🟢 Student: Get Today Menu
router.get("/today", protect, getTodayMenu);


// 🟢 Admin: Get All Menus
router.get("/all", protect, getAllMenus);


// 🟢 Admin: Update Menu (with optional image upload)
router.put("/update/:id", protect, upload.single("image"), updateMenu);


// 🟢 Admin: Delete Menu
router.delete("/delete/:id", protect, deleteMenu);


module.exports = router;