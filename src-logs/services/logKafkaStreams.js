import { consumer2, producer } from "../config/kafka.js";

// Initialize pageCounts as an empty array
let pageCounts = [];

const processLogsAndProduceMostVisitedPages = async () => {
  try {
    await producer.connect();
    await consumer2.connect();

    // Subscribe to the topic before starting the consumer
    await consumer2.subscribe({ topic: "web_logs", fromBeginning: true });

    // Set an interval to periodically process the aggregated data
    setInterval(async () => {
      if (pageCounts.length > 0) {
        try {
          // Send aggregated data to the most_visited_pages topic
          await producer.send({
            topic: "most_visited_pages",
            messages: [
              {
                value: JSON.stringify(pageCounts),
              },
            ],
          });


          // Reset counts after sending data
          pageCounts = [];
        } catch (err) {
          console.error("Error sending aggregated data:", err.message);
        }
      }
    }, 60000); // Periodically send every 60 seconds (adjust to your desired period)

    // Now start consuming messages from the subscribed topic
    await consumer2.run({
      eachMessage: async ({ message }) => {
        try {
          const log = JSON.parse(message.value.toString());
          const page = log.requested_page;

          // Find the page in the pageCounts array
          const pageAlreadyExist = pageCounts.find(
            (queryPage) => queryPage.page === page
          );

          // Increment the count if the page already exists, otherwise add a new entry
          if (pageAlreadyExist) {
            pageAlreadyExist.count += 1;
          } else {
            pageCounts.push({ page: page, count: 1 });
          }
        } catch (err) {
          console.error("Error processing message:", err.message);
        }
      },
    });

    process.on("SIGINT", async () => {
      console.log("Disconnecting Kafka consumer and producer...");
      await consumer2.disconnect();
      await producer.disconnect();
      process.exit(0);
    });
  } catch (err) {
    console.error(
      "Error in processLogsAndProduceMostVisitedPages:",
      err.message
    );
  }
};

export { processLogsAndProduceMostVisitedPages };
