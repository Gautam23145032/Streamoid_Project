const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true, trim: true },
  brand: { type: String, required: true, trim: true },
  color: { type: String, trim: true, default: null },
  size: { type: String, trim: true, default: null },
  mrp: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 },
  quantity: { type: Number, default: 0, min: 0 }
}, { timestamps: true });

productSchema.index({ name: 'text', brand: 'text', color: 'text' });

const Product = mongoose.model('product', productSchema);
module.exports = Product;
