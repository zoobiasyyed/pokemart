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
app.get('/api/products', authMiddleware, async (req, res, next) => {
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
app.get('/api/products/:productId', authMiddleware, async (req, res, next) => {
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
