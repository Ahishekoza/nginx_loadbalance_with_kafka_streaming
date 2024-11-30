import express from 'express';
import { createOrder, deleteAllOrders, getAllOrders } from '../controllers/order.controller.js';

const orderRoute = express.Router()

orderRoute.post('/order-product',createOrder)
orderRoute.get('/orders',getAllOrders)
orderRoute.delete('/delete-all-orders',deleteAllOrders)


export {orderRoute}