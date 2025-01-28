import express from "express";
import { client } from "../../../mongo.js";

const route = express.Router();

const database = client.db("sample_mflix");
const movies_collection = database.collection("movies");

route.get("/title", async (req, res) => {
  const { title } = req.query;

  if (!title) {
    res.json({ success: false, message: "title required" });
  }

  const movie = await movies_collection.findOne({ title: { $eq: title } });

  res.json({ success: true, data: { movie } });
});

export { route };
