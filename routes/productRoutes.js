const express = require("express");
const productController = require("../controllers/productController");
const upload = require("../middleware/upload");
const { authenticate, authorize } = require("../middleware/auth");

const router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - status
 *         - serialNumber
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID
 *         name:
 *           type: string
 *         category:
 *           type: string
 *           enum: [Electronics, Furniture, Equipment]
 *         status:
 *           type: string
 *           enum: [available, borrowed, damaged, disposed]
 *         assignedTo:
 *           type: string
 *         condition:
 *           type: string
 *         lastUpdated:
 *           type: string
 *           format: date-time
 *         serialNumber:
 *           type: string
 *         conditionLogs:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ConditionLog'
 *     ConditionLog:
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           format: date-time
 *         condition:
 *           type: string
 *         type:
 *           type: string
 *           enum: [before, after]
 */

/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Inventory product management
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Unauthorized access
 *
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       403:
 *         description: Unauthorized access
 *
 *   put:
 *     summary: Update a product (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Updated product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Unauthorized access
 *
 *   delete:
 *     summary: Delete a product (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       403:
 *         description: Unauthorized access
 */

/**
 * @swagger
 * /api/products/{id}/condition-logs:
 *   post:
 *     summary: Add condition log to product (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               condition:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [before, after]
 *     responses:
 *       200:
 *         description: Condition log added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Unauthorized access
 */

router.post(
  "/products",
  authenticate,
  authorize("admin"),
  upload.single("image"),
  productController.createProduct
);

router.put(
  "/products/:id",
  authenticate,
  authorize("admin"),
  upload.single("image"),
  productController.updateProduct
);

router.delete(
  "/products/:id",
  authenticate,
  authorize("admin"),
  productController.deleteProduct
);

// Public product routes (for authenticated users)
router.get("/products", productController.getAllProducts);
router.get("/products/:id", productController.getProductById);

router.post(
  "/:id/condition-logs",
  authorize("admin"),
  productController.addConditionLog
);

module.exports = router;