const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrowController');
const { authenticate, authorize } = require('../middleware/auth');

router.post('/borrow', authenticate, authorize('inventoryManager'), borrowController.borrowItem);
router.post('/return/:id', authenticate, authorize('inventoryManager'), borrowController.returnItem);

module.exports = router; 