import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const user = process.env.MONGO_USER;
const pass = process.env.MONGO_PASS;
const dbName = process.env.MONGO_DB;
const host = process.env.MONGO_HOST;
const port = process.env.MONGO_PORT;

const uri = `mongodb://${user}:${pass}@${host}:${port}/${dbName}?authSource=admin`;

const client = new MongoClient(uri);

let db = null;

// Connect only once
export async function connectDB() {
  if (!db) {
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db(dbName);
  }
  return db;
}

// ALWAYS return the existing db instance
export function getDB() {
  if (!db) {
    throw new Error("Database not connected! Call connectDB() first.");
  }
  return db;
}
