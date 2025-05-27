import mongoose from "mongoose";

import app from "./app.js";
import { config } from "./config/index.js";

const startServer = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    app.listen(config.PORT, () => {
      console.log(`Server is running on port ${config.PORT}`);
    });
  } catch (error) {
    console.error("Error: ", error);
    process.exit(1);
  }
};

startServer();