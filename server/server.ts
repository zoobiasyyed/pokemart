/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { ClientError, errorMiddleware, authMiddleware } from './lib/index.js';

type User = {
  userId: number;
  username: string;
  hashedPassword: string;
};
type Auth = {
  username: string;
  password: string;
};

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const hashKey = process.env.TOKEN_SECRET;
if (!hashKey) throw new Error('TOKEN_SECRET not found in .env');

const app = express();
app.use(express.json());

app.post('/api/auth/sign-up', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ClientError(400, 'username and password are required fields');
    }
    const hashedPassword = await argon2.hash(password);
    const sql = `
     insert into "users" ("username", "hashedPassword")
     values ($1, $2)
     returning "userId", "username"`;
    const params = [username, hashedPassword];
    const result = await db.query(sql, params);
    const users = result.rows[0];
    res.status(201).json(users);
  } catch (err) {
    next(err);
  }
});

app.post('/api/auth/sign-in', async (req, res, next) => {
  try {
    const { username, password } = req.body as Partial<Auth>;
    if (!username || !password) {
      throw new ClientError(401, 'invalid login');
    }

    const sql = `
     Select "userId", "hashedPassword", "username"
     From "users"
     Where "username" = $1`;
    const params = [username];
    const result = await db.query(sql, params);
    const user = result.rows[0];

    if (!user) throw new ClientError(400, 'invalid login');

    const match = await argon2.verify(user.hashedPassword, password);

    if (!match) throw new ClientError(401, 'Invalid Login');

    const payload = {
      userId: user.userId,
      username: user.username,
    };

    const token = jwt.sign(payload, hashKey);

    res.status(200).json({ user: payload, token });
  } catch (err) {
    next(err);
  }
});

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
    const params = [productId];
    const results = await db.query(sql, params);
    const product = results.rows[0];
    if (!product) throw new ClientError(404, `product ${productId} not found`);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

app.get('/api/bag/', authMiddleware, async (req, res, next) => {
  try {
    const sql = `
    Select *
    From "cartItems"
    where "userId" = $1
    `;
    const result = await db.query(sql, [req.user?.userId]);
    const bag = result.rows;
    res.status(200).json(bag);
  } catch (err) {
    next(err);
  }
});

app.post('/api/bag', authMiddleware, async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId) throw new ClientError(400, `productId is undefined`);
    if (!quantity) throw new ClientError(400, `quantity is undefined`);
    const sql = `
    insert into "cartItems" ("productId", "quantity", "userId")
     values ($1, $2, $3)
     returning *`;
    const params = [productId, quantity, req.user?.userId];
    const result = await db.query(sql, params);
    const bagItems = result.rows[0];
    const sql2 = `Select *
    From "products"
    Where "productId" = $1`;
    const result2 = await db.query(sql2, [bagItems.productId]);
    bagItems.product = result2.rows[0];
    res.status(201).json(bagItems);
  } catch (err) {
    next(err);
  }
});

app.put('/api/bag/:cartItemId', authMiddleware, async (req, res, next) => {
  try {
    const { cartItemId } = req.params;
    if (!Number.isInteger(+cartItemId)) {
      throw new ClientError(400, `Non-integer cartItemId: ${cartItemId}`);
    }
    const { quantity } = req.body;
    if (!quantity) throw new ClientError(400, `quantity is undefined`);
    const sql = `
    update "cartItems"
    set "quantity" = $1
    Where "cartItemId" = $2 and "userId" = $3
    returning *`;
    const params = [quantity, cartItemId, req.user?.userId];
    const result = await db.query(sql, params);
    const editedQuantity = result.rows[0];
    if (!editedQuantity) throw new ClientError(404, ` ${cartItemId} not found`);
    const sql2 = `Select *
    From "products"
    Where "productId" = $1`;
    const result2 = await db.query(sql2, [editedQuantity.productId]);
    editedQuantity.product = result2.rows[0];
    res.status(200).json(editedQuantity);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/bag/:cartItemId', authMiddleware, async (req, res, next) => {
  try {
    const { cartItemId } = req.params;
    if (!Number.isInteger(+cartItemId)) {
      throw new ClientError(400, `Non-integer cartItemId: ${cartItemId}`);
    }
    const sql = `
    Delete from "cartItems"
    Where "cartItemId" = $1  and "userId" = $2
    returning *`;
    const params = [cartItemId, req.user?.userId];
    const result = await db.query(sql, params);
    const cartItem = result.rows[0];
    if (!cartItem) throw new ClientError(404, `${cartItemId} not found`);
    res.sendStatus(204);
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
