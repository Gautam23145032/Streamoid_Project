
const requiredFields = ['sku', 'name', 'brand', 'mrp', 'price'];

function isEmpty(v) {
  return v === undefined || v === null || (typeof v === 'string' && v.trim() === '');
}

function normalizeValue(val) {
  if (val === undefined || val === null) return '';
  return String(val).trim();
}

function parseNumber(v) {
  const n = Number(normalizeValue(v));
  return Number.isNaN(n) ? null : n;
}

function validateRow(row, rowNum) {
  const r = {};
  for (const k of Object.keys(row)) {
    r[k.trim().toLowerCase()] = normalizeValue(row[k]);
  }

  for (const f of requiredFields) {
    if (isEmpty(r[f])) {
      return { valid: false, reason: `missing required field "${f}"`, rowNum };
    }
  }

  const mrp = parseNumber(r.mrp);
  const price = parseNumber(r.price);
  const quantity = r.quantity === '' ? 0 : parseNumber(r.quantity);

  if (mrp === null || mrp < 0) {
    return { valid: false, reason: `invalid mrp`, rowNum };
  }
  if (price === null || price < 0) {
    return { valid: false, reason: `invalid price`, rowNum };
  }
  if (price > mrp) {
    return { valid: false, reason: `price (${price}) > mrp (${mrp})`, rowNum };
  }
  if (quantity === null || quantity < 0) {
    return { valid: false, reason: `invalid quantity`, rowNum };
  }

  const doc = {
    sku: r.sku,
    name: r.name,
    brand: r.brand,
    color: r.color || null,
    size: r.size || null,
    mrp,
    price,
    quantity
  };

  return { valid: true, doc, rowNum };
}

module.exports = { validateRow };
