import express from 'express';
import product from './routes/products.route.js';
import user from './routes/user.route.js';
import order from './routes/order.routes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { errorMiddleware } from './middlewares/error.js';

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ limit: '16kb', extended: true }));
app.use(express.static('public'));
app.use(cookieParser());


app.use('/api/v1', product);
app.use('/api/v1', user);
app.use('/api/v1', order);

app.use(errorMiddleware)

export { app }