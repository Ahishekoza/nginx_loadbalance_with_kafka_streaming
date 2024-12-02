import { consumer } from "../config/kafka.js";
import { saveLogsInDatabase } from "../controllers/log.controller.js";

const consumingLogsToDatabase = async () => {
  await consumer.connect();

  await consumer.subscribe({ topic: "web_logs", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const log = JSON.parse(message.value.toString());
        
        console.log(log);
        await saveLogsInDatabase(log)
      } catch (err) {
        console.error("Error processing message:", err.message);
      }

    },
  });

  process.on("SIGINT", async () => {
    console.log("Disconnecting Kafka consumer...");
    await consumer.disconnect();
    process.exit(0);
  });
};

export { consumingLogsToDatabase };
