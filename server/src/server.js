import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import signupRouter from "./routes/signup.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/signup", signupRouter);

const PORT = 3000;

app.listen(PORT, async () => {
  console.log("Server running on port", PORT);
  await connectDB();
});
