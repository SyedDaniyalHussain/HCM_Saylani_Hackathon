// import 'dotenv/config';
// import app from './app.js';
// import { connectDB } from './config/db.js';
// const port = Number(process.env.PORT) || 5000;
// try {
//   await connectDB();
//   const server = app.listen(port, () => console.log(`HCM Lite API listening at http://localhost:${port}`));
//   const shutdown = (signal) => { console.log(`${signal} received; shutting down...`); server.close(() => process.exit(0)); };
//   process.on('SIGINT', () => shutdown('SIGINT'));
//   process.on('SIGTERM', () => shutdown('SIGTERM'));
// } catch (error) {
//   console.error('Unable to start API:', error.message);
//   process.exit(1);
// }






import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Express backend is running!");
});

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "sehatvault",
    });

    console.log("MongoDB Atlas connected successfully!");

    const port = process.env.PORT || 5000;

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
}

startServer();
