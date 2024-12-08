import express from "express";
// import os from "os";
import dotenv from "dotenv";
import { sendLogsToDatabase } from "./services/logProducer.js";
import { connectDB } from "./config/db.js";
import { Logs } from "./models/log.model.js";
import { consumingLogsToDatabase } from "./services/logConsumer.js";
import { processLogsAndProduceMostVisitedPages } from "./services/logKafkaStreams.js";
import { consumeAggregatedResults } from "./services/logKafkaStreamsConsumer.js";
import { MostVisitedPage } from "./models/popularProduct.model.js";
const app = express();

dotenv.config();

app.use(express.json());

// ---Flow -- > req coming from any web server ---> producing the log ---> creating events outof logs for a specific topic
// ---> consume the logs by subscribing to the topic and then saving the logs received from events to database

// --- sample URL : localhost:80/api/v1/product*
app.get("/api/v1/product1", async (req, res) => {
  const log = {
    server_ip: req.ip,
    requested_page: req.originalUrl,
  };
  await sendLogsToDatabase(log);

  res.status(200).json({
    message: "Product 1 successfully fetched",
  });
});

app.get("/api/v1/product2", async (req, res) => {
  const log = {
    server_ip: req.ip,
    requested_page: req.originalUrl,
  };
  await sendLogsToDatabase(log);

  res.status(200).json({
    message: "Product 2 successfully fetched",
  });
});

app.get("/api/v1/product3", async (req, res) => {
  const log = {
    server_ip: req.ip,
    requested_page: req.originalUrl,
  };
  await sendLogsToDatabase(log);

  res.status(200).json({
    message: "Product 3 successfully fetched",
  });
});

app.get("/api/v1/product4", async (req, res) => {
  const log = {
    server_ip: req.ip,
    requested_page: req.originalUrl,
  };
  await sendLogsToDatabase(log);

  res.status(200).json({
    message: "Product 4 successfully fetched",
  });
});

app.get("/api/v1/product5", async (req, res) => {
  const log = {
    server_ip: req.ip,
    requested_page: req.originalUrl,
  };
  await sendLogsToDatabase(log);

  res.status(200).json({
    message: "Product 5 successfully fetched",
  });
});

// processMostVisitedPages()
// --- To check whether the logs has been saved to database
// ---URL : - localhost:80/api/v1/logs

app.get("/api/v1/logs", async (req, res) => {
  try {
    const logs = await Logs.find({});

    return res.status(200).json({
      logs: logs,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error getting logs",
    });
  }
});

app.get("/api/v1/visitedPagesCount", async (req, res) => {
  try {
    const pagesCount = await MostVisitedPage.find({});

    return res.status(200).json(pagesCount);
  } catch (error) {
    res.status(404).json({
      message: "Error getting logs",
    });
  }
});

app.get("/api/v1/mostVisitedPage", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const visitedData = await MostVisitedPage.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: "page",
          totalVisits: { $sum: "$count" },
        },
      },
      {
        $sort: { totalVisits: -1 },
      },
    ]);

    return res.status(200).json(visitedData);
  } catch (error) {
    res.status(404).json({
      message: "Error getting mostVisitedPagesPerPtime",
    });
  }
});

const startServices = async () => {
  try {
    // --- First consumer: Saves log in DB
    console.log("Starting to consume logs and save them in DB");
    const consumer1 = consumingLogsToDatabase();  // Start the first consumer

    // --- Second consumer: Processes logs, manipulates them, and produces new topics
    console.log("Starting to process logs and produce most visited pages");
    const consumer2 = processLogsAndProduceMostVisitedPages();  // Start the second consumer

    // --- Third consumer: Consumes aggregated results from the new topic
    console.log("Starting to consume aggregated results");
    const consumer3 = consumeAggregatedResults();  // Start the third consumer

    // Wait for all consumers to start and run
    await Promise.all([consumer1, consumer2, consumer3]);
  } catch (error) {
    console.error("Error starting services:", error);
  }
};

startServices();

connectDB().then(async() => {

  app.listen(4000, () => {
    console.log(`Server is listening on 4000`);
  });
});
