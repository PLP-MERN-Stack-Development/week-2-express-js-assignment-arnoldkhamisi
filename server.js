const express = require('express');
const logger = require('./middleware/logger');
const productsRouter = require('./routes/products');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(logger); // Custom logger middleware
app.use(express.json()); // Parse JSON bodies

// Hello World route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Products RESTful API and advanced features
app.use('/api/products', productsRouter);

// Global error handler (should be last)
app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});