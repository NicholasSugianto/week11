import express from "express";
import cors from "cors";
import { connectDB, getDB } from "./db.js";
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

// ---------------- DELETE USER ----------------
app.post('/delete-user', async (req, res) => {
  const email = req.body.email;

  try {
    const db = getDB();  // <-- FIXED
    const result = await db.collection('participants').deleteOne({ email });

    if (result.deletedCount === 0) {
      return res.json({ message: "No user found with that email" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user" });
  }
});

// ---------------- APPROVE USER ----------------
app.post('/approve-user', async (req, res) => {
  const email = req.body.email;

  try {
    const db = getDB();  
    const result = await db.collection('participants').updateOne(
      { email },
      { $set: { status: "approved" } }
    );

    if (result.matchedCount === 0) {
      return res.json({ message: "No user found with that email" });
    }

    res.json({ message: "User approved successfully" });
  } catch (error) {
    console.error("APPROVE USER ERROR:", error);   // <--- ADD THIS
    res.status(500).json({ message: "Error approving user" });
  }
});
