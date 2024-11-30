import { Inventory } from "../models/inventory.model.js";
import { Product } from "../models/product.model.js";

export const addProductToInventory = async (req, res) => {
  // --- check if item is present in inventory
  // --- if yes then plus the quantity
  // --- if not then create a create a product and add in the inventory

  const { name, quantity = 0, description = "", price = 0 } = req.body;

  try {
    const existingItem = await Inventory.findOne({ item: name });
    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      res.status(200).json({
        message: `Updated quantity for ${name}`,
      });
    } else {
      const newProduct = new Product({
        name: name,
        description: description,
        price: price,
      });

      await newProduct.save();

      const inventory = new Inventory({
        item: name,
        quantity: quantity,
      });

      await inventory.save();

      res.status(201).json({
        message: `Product ${name} saved and added to Inventory successfully`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while adding the product to inventory.",
      error: error.message,
    });
  }
};

export const getAllProductsFromInventory = async (req, res) => {
  try {
    const getAllProducts = await Inventory.find();
    res.status(200).json({
      inventory_products: getAllProducts,
    });
  } catch (error) {
    return res.status(500).json({
      message:
        "An error occurred while getting all the products from the inventory.",
      error: error.message,
    });
  }
};

export const updateInventoryAfterOrder = async (itemName, quantity) => {
  // --- find the item from the inventory using itemName
  // --- if the inventory is empty then throw an error
  // --- if item is present in the inventory then reduce the quantity from existing quantity for stock maintance
  // --- also keep the check on the quantity


try {
  // Find the product in the inventory by name
  const product = await Inventory.findOne({ item: itemName });

  if (product) {
    // Reduce the quantity of the item
    product.quantity -= quantity;

    // Save the updated product
    await product.save();
    console.log(`Inventory updated: ${itemName} now has ${product.quantity} units remaining.`);
  } else {
    // Item not found in inventory
    console.log(`Item "${itemName}" not found in inventory.`);
  }
} catch (error) {
  console.error(
    `An error occurred while updating the inventory for item "${itemName}":`,
    error.message
  );
}

};
