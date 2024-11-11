/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import { ClientError, errorMiddleware } from './lib/index.js';

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();
app.use(express.json());

// getting all the products
app.get('/api/products', async (req, res, next) => {
  try {
    const sql = `
    Select *
    from "products"`;
    const results = await db.query(sql);
    res.json(results.rows);
  } catch (err) {
    next(err);
  }
});

// app.get('/api/products/:productId', async (req, res, next) => {
//   try {
//     const { productId } = req.params;
//     if (!Number.isInteger(+productId)) {
//       throw new ClientError(400, `Non-integer productId: ${productId}`);
//     }
//     const { category } = req.body;
//     const sql = `
//     Select *
//     from "products"
//     Where "productId" = $1`;
//     const results = await db.query(sql, [productId]);
//     const product = results.rows[0];
//     if (!product) throw new ClientError(404, `product ${productId} not found`);
//     res.json(product);
//   } catch (err) {
//     next(err);
//   }
// });

// getting the product with specific id (will be used in product details page)
app.get('/api/products/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params;
    if (!Number.isInteger(+productId)) {
      throw new ClientError(400, `Non-integer productId: ${productId}`);
    }
    const sql = `
    Select *
    from "products"
    Where "productId" = $1`;
    const results = await db.query(sql, [productId]);
    const product = results.rows[0];
    if (!product) throw new ClientError(404, `product ${productId} not found`);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// Create paths for static directories
const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

/*
 * Handles paths that aren't handled by any other route handler.
 * It responds with `index.html` to support page refreshes with React Router.
 * This must be the _last_ route, just before errorMiddleware.
 */
app.get('*', (req, res) => res.sendFile(`${reactStaticDir}/index.html`));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT);
});
