import express from 'express';
import { addProductToInventory, getAllProductsFromInventory } from '../controllers/inventory.controller.js';
const inventoryRoute  = express.Router()

inventoryRoute.post('/add-product-inventory',addProductToInventory)
inventoryRoute.get('/get-inventory-products',getAllProductsFromInventory)
export {inventoryRoute}