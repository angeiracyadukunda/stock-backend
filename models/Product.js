const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - itemName
 *         - category
 *         - quantity
 *         - unitPrice
 *         - supplierName
 *         - purchaseDate
 *         - status
 *       properties:
 *         itemName:
 *           type: string
 *         category:
 *           type: string
 *           enum: [electronics, furniture, equipments]
 *         quantity:
 *           type: number
 *         unitPrice:
 *           type: number
 *         totalValue:
 *           type: number
 *         supplierName:
 *           type: string
 *         purchaseDate:
 *           type: string
 *           format: date
 *         status:
 *           type: string
 *           enum: [inStock, lowStock, outOfStock]
 *         image:
 *           type: string
 *         description:
 *           type: string
 */

const conditionLogSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  condition: String,
  type: { type: String, enum: ["before", "after"] },
});

const productSchema = new mongoose.Schema(
  {
    itemName: { type: String, required: true, unique:false },
    serialNumber: { type: String, required: true, unique: true },
    category: {
      type: String,
      enum: ["Devices", "Furniture", "Cleaning Materials", "Utensils"],
      required: true,
    },
    condition: {
      type: String,
      enum: ["New", "Good", "Worn Out", "Broken"],
      default: "New",
    },
    status: {
      type: String,
      enum: ["available", "borrowed", "damaged", "disposed"],
      required: true,
    },
    currentBorrower: { type: mongoose.Schema.Types.ObjectId, ref: "Borrower" },
    purchaseDate: Date,
    damageHistory: [
      {
        description: String,
        reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        reportedAt: Date,
        repairStatus: {
          type: String,
          enum: ["Reported", "In Repair", "Repaired", "Disposed"],
        },
      },
    ],
    history: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        action: String,
        date: { type: Date, default: Date.now },
        notes: String,
      },
    ],
    
    description: { type: String },
  
    assignedTo: String,
    lastUpdated: { type: Date, default: Date.now },
    conditionLogs: [conditionLogSchema],
  },
  { timestamps: true }
);

// Add unique compound index
productSchema.index({ itemName: 1, supplierName: 1 }, { unique: true });

productSchema.pre("save", function (next) {
  this.totalValue = this.quantity * this.unitPrice;
  next();
});

module.exports = mongoose.model("Product", productSchema);