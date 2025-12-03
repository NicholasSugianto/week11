import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=${process.env.MONGO_DB}`;

const client = new MongoClient(uri);
let db;

export async function connectDB() {
  try {
    await client.connect();
    db = client.db(process.env.MONGO_DB);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

export function getDB() {
  return db;
}
