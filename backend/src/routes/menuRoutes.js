const express = require('express');
const route = express.Router();

// function import
const {
    createMenu,
    getTodayMenu,
    getAllMenus,
    updateMenu,
    deleteMenu
} = require('../controllers/menuController');

const upload = reqire('..middleware/upload')

// routes define
router.post('/create', upload.single('image'), createMenu)
router.get('/today', getTodayMenu);
router.post('/', createMenu);
router.get('/', getAllMenus);
router.put('/:id', updateMenu); 
router.delete('/:id', deleteMenu); 

// router export 

module.exports = route;