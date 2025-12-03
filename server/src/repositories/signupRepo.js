import { getDB } from "../db.js";
import { ObjectId } from "mongodb";

export const SignupRepo = {
  async create(data) {
    const db = getDB();
    const result = await db.collection("participants").insertOne({
      ...data,
      createdAt: new Date()
    });
    return result;
  },

  async getList(page, limit) {
    const db = getDB();
    const skip = (page - 1) * limit;

    const items = await db.collection("participants")
      .find()
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await db.collection("participants").countDocuments();

    return { items, total };
  },

  async update(id, data) {
    const db = getDB();
    const result = await db.collection("participants")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: data }
      );
    return result;
  },

  async remove(id) {
    const db = getDB();
    const result = await db.collection("participants")
      .deleteOne({ _id: new ObjectId(id) });
    return result;
  }
};
