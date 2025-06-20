# Express.js Products API

## Overview

This project is a RESTful API built with Express.js for managing products.  
It demonstrates CRUD operations, middleware usage, error handling, filtering, pagination, search, and statistics.

---

## Features

- **CRUD:** Create, Read, Update, Delete products
- **Middleware:** Logging, authentication, and validation
- **Error Handling:** Custom error classes and global error handler
- **Advanced Features:**  
  - Filter products by category  
  - Pagination  
  - Search products by name  
  - Product statistics (count by category)

---

## Endpoints

| Method | Endpoint                              | Description                        |
|--------|---------------------------------------|------------------------------------|
| GET    | `/`                                   | Hello World test route             |
| GET    | `/api/products`                       | List all products (with filters)   |
| GET    | `/api/products/:id`                   | Get a product by ID                |
| POST   | `/api/products`                       | Create a new product               |
| PUT    | `/api/products/:id`                   | Update an existing product         |
| DELETE | `/api/products/:id`                   | Delete a product                   |
| GET    | `/api/products/stats/count-by-category` | Get product count by category    |

### Query Parameters for `/api/products`

- `category` — Filter by category (e.g., `/api/products?category=Electronics`)
- `search` — Search by product name (e.g., `/api/products?search=phone`)
- `page` — Page number for pagination (e.g., `/api/products?page=2`)
- `limit` — Number of products per page (e.g., `/api/products?limit=5`)

---

## Middleware

- **Logger:** Logs request method, URL, and timestamp
- **Authentication:** Checks for `x-api-key` header
- **Validation:** Validates product data on create and update

---

## Error Handling

- Custom error classes: `NotFoundError`, `ValidationError`
- Global error handler returns proper HTTP status and message

---

## Example Product Object

```json
{
  "id": "uuid",
  "name": "Sample Product",
  "description": "A product description",
  "price": 99.99,
  "category": "Electronics",
  "inStock": true
}
```

---

## Getting Started

1. **Install dependencies:**
   ```
   npm install
   ```

2. **Set your API key:**  
   If using authentication, set your API key in the code or via environment variable.

3. **Run the server:**
   ```
   node server.js
   ```

4. **Test the API:**  
   Use Postman, Insomnia, or curl.

---

## Project Structure

```
middleware/
  logger.js
  auth.js
  validateProduct.js
  errors.js
  errorHandler.js
routes/
  products.js
server.js
README.md
Week2-Assignment.md