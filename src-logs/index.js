import express from "express";
// import os from "os";
import dotenv from "dotenv";
import { sendLogsToDatabase } from "./services/logProducer.js";
import { connectDB } from "./config/db.js";
import { Logs } from "./models/log.model.js";
import { consumingLogsToDatabase } from "./services/logConsumer.js";
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


consumingLogsToDatabase()


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

connectDB().then(() => {
  app.listen(4000, () => {
    console.log(`Server is listening on 4000`);
  });
});
