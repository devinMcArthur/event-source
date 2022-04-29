import "reflect-metadata";
import path from "path";
import * as dotenv from "dotenv";

// Setup environment variables
const production = process.env.NODE_ENV === "production";
if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
  dotenv.config({ path: path.join(__dirname, "..", ".env.development") });
}

import mongoose from "mongoose";
import createApp from "./app";
import subscriptions from "subscriptions";

const main = async () => {
  console.log("Starting server...");

  try {
    if (process.env.NODE_ENV !== "test" && process.env.MONGO_URI) {
      await mongoose.connect("mongodb://localhost:27017/event-source", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB Connected");

      if (!production) {
        // await seedDatabase();
      }
    }

    const port = process.env.PORT || 8080;

    const app = await createApp();

    await subscriptions();

    app.listen(port, () => console.log(`Server running on port: ${port}`));
  } catch (error: unknown) {
    console.error(error);
  }
};

main().catch((err) => console.error(err));
