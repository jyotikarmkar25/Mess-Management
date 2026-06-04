const Menu = require("../models/Menu");


// 1. Create Menu (Admin + Image Upload)
const createMenu = async (req, res) => {
  try {
    const { date, breakfast, lunch, dinner } = req.body;

    const menu = await Menu.create({
      date,
      breakfast,
      lunch,
      dinner,
      image: req.file ? req.file.filename : null, // ⭐ IMAGE ADDED
    });

    res.status(201).json({
      message: "Menu created successfully",
      menu,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// 2. Get Today Menu (Student)
const getTodayMenu = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const menu = await Menu.findOne({ date: today });

    if (!menu) {
      return res.status(404).json({
        message: "Today's menu not found",
      });
    }

    res.status(200).json({
      message: "Today's menu fetched successfully",
      menu,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// 3. Get All Menus (Admin)
const getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.find();

    res.status(200).json({
      message: "All menus fetched successfully",
      menus,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// 4. Update Menu (Admin)
const updateMenu = async (req, res) => {
  try {
    const { id } = req.params;

    const menu = await Menu.findByIdAndUpdate(
      id,
      {
        ...req.body,
        ...(req.file && { image: req.file.filename }), // ⭐ IMAGE UPDATE SUPPORT
      },
      { new: true }
    );

    if (!menu) {
      return res.status(404).json({
        message: "Menu not found",
      });
    }

    res.status(200).json({
      message: "Menu updated successfully",
      menu,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// 5. Delete Menu (Admin)
const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;

    const menu = await Menu.findByIdAndDelete(id);

    if (!menu) {
      return res.status(404).json({
        message: "Menu not found",
      });
    }

    res.status(200).json({
      message: "Menu deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Export
module.exports = {
  createMenu,
  getTodayMenu,
  getAllMenus,
  updateMenu,
  deleteMenu,
};