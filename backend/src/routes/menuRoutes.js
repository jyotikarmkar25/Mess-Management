const express = require("express");
const router = express.Router();

const {
  createMenu,
  getTodayMenu,
  getAllMenus,
  updateMenu,
  deleteMenu,
} = require("../controllers/menuController");

const { protect, admin } = require("../middleware/authMiddleware");

// Multer Upload Middleware
const upload = require("../middleware/upload");

// Student Routes
router.get("/today", protect, getTodayMenu);

// Admin Routes
router.post(
  "/",
  protect,
  admin,
  upload.single("image"),
  createMenu
);

router.get(
  "/",
  protect,
  admin,
  getAllMenus
);

router.put(
  "/:id",
  protect,
  admin,
  upload.single("image"),
  updateMenu
);

router.delete(
  "/:id",
  protect,
  admin,
  deleteMenu
);

module.exports = router;