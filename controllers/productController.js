const Product = require("../models/Product");
const { verifyAdmin } = require("../middleware/auth");

exports.createProduct = async (req, res) => {
  try {
    

    const { itemName, category, status, assignedTo, condition, serialNumber } =
      req.body;

    // Validate required fields
    // if (!name || !category || !status || !serialNumber) {
    //   return res.status(400).json({ error: "Missing required fields" });
    // }

    // Check for existing serial number
    const existingProduct = await Product.findOne({ serialNumber });
    if (existingProduct) {
      return res.status(409).json({ error: "Serial number already exists" });
    }

    const productData = {
      itemName,
      category,
      status,
      assignedTo: assignedTo || null,
      condition,
      serialNumber,
      lastUpdated: new Date(),
      conditionLogs: [],
    };

    const product = new Product(productData);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Invalid product ID" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    if (!verifyAdmin(req.user)) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    const updates = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...updates, lastUpdated: new Date() },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    if (!verifyAdmin(req.user)) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.addConditionLog = async (req, res) => {
  try {
    if (!verifyAdmin(req.user)) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    const { condition, type } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $push: { conditionLogs: { date: new Date(), condition, type } },
        $set: { condition, lastUpdated: new Date() },
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};