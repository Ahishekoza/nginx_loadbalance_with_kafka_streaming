import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,  // Ensure each item name is unique
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,  // Price can't be negative
  }
},{timestamps: true});

export const Product =  mongoose.model('product',productSchema)
