const express = require('express');
const { v4: uuidv4 } = require('uuid');
const authenticateApiKey = require('../middleware/auth');
const validateProduct = require('../middleware/validateProduct');
const { NotFoundError, ValidationError } = require('../middleware/errors');

const router = express.Router();
let products = [];

// GET /api/products?category=&page=&limit=&search=
router.get('/', (req, res, next) => {
  try {
    let result = [...products];

    // Filtering by category
    if (req.query.category) {
      result = result.filter(p => p.category === req.query.category);
    }

    // Searching by name
    if (req.query.search) {
      const search = req.query.search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(search));
    }

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || result.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = result.slice(start, end);

    res.json({
      total: result.length,
      page,
      limit,
      products: paginated
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:id
router.get('/:id', (req, res, next) => {
  try {
    const product = products.find(p => p.id === req.params.id);
    if (!product) throw new NotFoundError('Product not found');
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// POST /api/products
router.post('/', authenticateApiKey, validateProduct, (req, res, next) => {
  try {
    const { name, description, price, category, inStock } = req.body;
    const newProduct = {
      id: uuidv4(),
      name,
      description,
      price,
      category,
      inStock
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
});

// PUT /api/products/:id
router.put('/:id', authenticateApiKey, validateProduct, (req, res, next) => {
  try {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index === -1) throw new NotFoundError('Product not found');
    const { name, description, price, category, inStock } = req.body;
    products[index] = {
      ...products[index],
      name,
      description,
      price,
      category,
      inStock
    };
    res.json(products[index]);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/products/:id
router.delete('/:id', authenticateApiKey, (req, res, next) => {
  try {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index === -1) throw new NotFoundError('Product not found');
    const deleted = products.splice(index, 1);
    res.json(deleted[0]);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/stats/count-by-category
router.get('/stats/count-by-category', (req, res) => {
  const stats = {};
  products.forEach(p => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });
  res.json(stats);
});

module.exports = router;