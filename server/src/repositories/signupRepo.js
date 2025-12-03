import { getDB } from "../db.js";
import { ObjectId } from "mongodb";

export const SignupRepo = {
  async create(data) {
    const db = await getDB();
    return db.collection("participants").insertOne(data);
  },

  async getList(page = 1, limit = 10) {
    const db = await getDB();
    const skip = (page - 1) * limit;

    const items = await db
      .collection("participants")
      .find()
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await db.collection("participants").countDocuments();

    return { page, limit, total, items };
  },

  async update(id, data) {
    const db = await getDB();
    return db
      .collection("participants")
      .updateOne({ _id: new ObjectId(id) }, { $set: data });
  },

  async remove(id) {
    const db = await getDB();
    return db
      .collection("participants")
      .deleteOne({ _id: new ObjectId(id) });
  }
};
