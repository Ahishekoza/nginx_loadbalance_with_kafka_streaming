import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionEstablished = await mongoose.connect(
      // ${process.env.MONGO_INITDB_ROOT_USERNAME}
      // ${process.env.MONGO_INITDB_ROOT_PASSWORD}
      // --- change the operator to mongo once app is dockerized
      `mongodb://abhishek:mypassword@mongo:27017/?authSource=admin`
    );
    console.log(
      "MongoDB connection established",
      connectionEstablished.connection.host
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

export { connectDB };
