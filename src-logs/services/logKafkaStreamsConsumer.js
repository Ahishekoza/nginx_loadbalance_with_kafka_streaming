import { consumer3 } from "../config/kafka.js";
import { saveMostVisitedPagePerPtime } from "../controllers/log.controller.js";
const consumeAggregatedResults = async () => {
    await consumer3.connect();
    await consumer3.subscribe({ topic: "most_visited_pages", fromBeginning: true });
  
    await consumer3.run({
      eachMessage: async ({ message }) => {
        try {
          const pageCounts = JSON.parse(message.value.toString());
          console.log("Aggregated Result:", pageCounts);

          // {
          //   page:"",
          //   count:0
          // }
          for (const pageAccessCountPerProduct of pageCounts) {
            await saveMostVisitedPagePerPtime(pageAccessCountPerProduct);
          }
          
        //   await saveMostVisitedPages(data); // Save to MongoDB
        } catch (err) {
          console.error("Error processing aggregated message:", err.message);
        }
      },
    });
}

export {consumeAggregatedResults}