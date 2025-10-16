const fs = require('fs');
const csv = require('csv-parser');
const Product = require('../models/productModel');
const { validateRow } = require('../utils/csvValidator');

async function renderHome(req, res) {
  res.render('home', { products: [], message: null, error: null });
}

async function handleCSVUpload(req, res) {
  try {
    if (!req.file) {
      return res.render('home', { products: [], message: null, error: 'Please select a CSV file to upload.' });
    }

    const results = [];
    const failed = [];
    let rowNum = 0;

    const stream = fs.createReadStream(req.file.path)
      .pipe(csv({ mapHeaders: ({ header }) => header && header.trim().toLowerCase() }));

    for await (const row of stream) {
      rowNum++;
      const { valid, doc, reason } = validateRow(row, rowNum);
      if (valid) results.push(doc);
      else failed.push({ row: rowNum, reason });
    }

    let inserted = 0;
    if (results.length > 0) {
      try {
        const insertedDocs = await Product.insertMany(results, { ordered: false });
        inserted = insertedDocs.length;
      } catch (err) {
        inserted = results.length - (err.writeErrors ? err.writeErrors.length : 0);
      }
    }

    fs.unlinkSync(req.file.path);

    res.render('home', {
      products: await Product.find().sort({ createdAt: -1 }),
      message: `${inserted} products added successfully. ${failed.length} failed.`,
      error: failed.length > 0 ? JSON.stringify(failed, null, 2) : null
    });
  } catch (err) {
    res.render('home', { products: [], message: null, error: err.message });
  }
}

async function handleSearch(req, res) {
  try {
    const { brand, color, minPrice, maxPrice } = req.query;
    const filter = {};
    if (brand) filter.brand = { $regex: brand, $options: 'i' };
    if (color) filter.color = { $regex: color, $options: 'i' };
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.render('home', { products, message: `${products.length} result(s) found`, error: null });
  } catch (err) {
    res.render('home', { products: [], message: null, error: err.message });
  }
}

module.exports = { renderHome, handleCSVUpload, handleSearch };
