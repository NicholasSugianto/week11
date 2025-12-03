import express from "express";
import { SignupRepo } from "../repositories/signupRepo.js";

const router = express.Router();

// POST /api/signup
router.post("/", async (req, res) => {
  try {
    const result = await SignupRepo.create(req.body);
    res.json({ _id: result.insertedId });
  } catch (err) {
    // Handle duplicate email
    if (err.code === 11000) {
      return res.status(400).json({ error: "Email already registered" });
    }

    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/signup?page=1&limit=10
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const data = await SignupRepo.getList(page, limit);
  res.json(data);
});

// PATCH /api/signup/:id
router.patch("/:id", async (req, res) => {
  const result = await SignupRepo.update(req.params.id, req.body);
  res.json(result);
});

// DELETE /api/signup/:id
router.delete("/:id", async (req, res) => {
  const result = await SignupRepo.remove(req.params.id);
  res.json(result);
});

export default router;
