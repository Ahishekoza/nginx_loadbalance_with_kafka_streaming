
import { consumer1 } from "../config/kafka.js";
import { saveLogsInDatabase } from "../controllers/log.controller.js";

const consumingLogsToDatabase = async () => {
  // const consumer = kafka.consumer({groupId:'logs-reading-group'})
  await consumer1.connect();

  await consumer1.subscribe({ topic: "web_logs", fromBeginning: true });

  await consumer1.run({
    eachMessage: async ({ message }) => {
      try {
        const log = JSON.parse(message.value.toString());
        
        await saveLogsInDatabase(log)
      } catch (err) {
        console.error("Error processing message:", err.message);
      }

    },
  });

  process.on("SIGINT", async () => {
    console.log("Disconnecting Kafka consumer...");
    await consumer1.disconnect();
    process.exit(0);
  });
};

export { consumingLogsToDatabase };
