import { consumer } from "../config/kafka.js";
import { updateInventoryAfterOrder } from "../controllers/inventory.controller.js";

const consumeOrderEventAndModifyInventory = async () => {
  try {
    await consumer.connect();

    await consumer.subscribe({ topic: "orders", fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ message, partition, topic }) => {
        try {
          const order = JSON.parse(message.value.toString());
          console.log(`Received order from topic ${topic}, partition ${partition}:`, order);

          // Update inventory based on the received order
          await updateInventoryAfterOrder(order.item, order.quantity);
        } catch (err) {
          console.error("Error processing message:", err.message);
        }
      },
    });
  } catch (err) {
    console.error("Error setting up Kafka consumer:", err.message);
  }

  // Handle unexpected errors
  process.on("SIGINT", async () => {
    console.log("Disconnecting Kafka consumer...");
    await consumer.disconnect();
    process.exit(0);
  });
};

export { consumeOrderEventAndModifyInventory };
