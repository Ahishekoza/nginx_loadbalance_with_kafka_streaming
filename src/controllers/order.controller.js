import { Order } from "../models/order.model.js";
import { sendOrderEvent } from "../services/orderProducer.js";

export const createOrder = async (req, res) => {
  // --- create order for specific user
  // --- once order is created sendOrderEvent

  const { userId, item, quantity, status = "pending" } = req.body;

  try {
    const order = new Order({
      userId: userId,
      item: item,
      quantity: quantity,
      status: status,
    });

    await order.save();

    await sendOrderEvent(order);

    res.status(200).json({
      message: "Order Placed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while creating order",
      error: error.message,
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const allOrders = await Order.find();
    return res.status(200).json({
      orders: allOrders,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while getting all orders",
      error: error.message,
    });
  }
};

export const deleteAllOrders = async (req, res) => {
  try {
    const deleteAllOrders = await Order.deleteMany({});
    return res.status(200).json({
      orders: deleteAllOrders,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while deleting all orders",
      error: error.message,
    });
  }
};

