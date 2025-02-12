const mongoose = require("mongoose");

const borrowerSchema = new mongoose.Schema({
  nationalId: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  residence: String,
  assurerName: String,
  assurerContact: String,
  borrowedItems: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      borrowedDate: Date,
      dueDate: Date,
      returnedDate: Date,
    },
  ],
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Borrower:
 *       type: object
 *       required:
 *         - nationalId
 *         - fullName
 *         - email
 *         - phone
 *       properties:
 *         nationalId:
 *           type: string
 *         fullName:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         phone:
 *           type: string
 *         residence:
 *           type: string
 *         assurerName:
 *           type: string
 *         assurerContact:
 *           type: string
 */

module.exports = mongoose.model("Borrower", borrowerSchema);
