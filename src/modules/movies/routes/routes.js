import express from "express";
import { client } from "../../../mongo.js";
import { parse } from "dotenv";

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

route.get("/genre", async (req, res) => {
  const { genre, page = 1, limit = 10 } = req.query;

  const parsedPage = parseInt(page);
  const parsedLimit = parseInt(limit);

  if (!genre) {
    res.json({ success: false, message: "genre required" });
  }

  const query = { genres: { $eq: genre } };

  const movies = await movies_collection
    .find(query)
    .skip((parsedPage - 1) * parsedLimit)
    .limit(parsedLimit)
    .toArray();

  const movieCount = await movies_collection.countDocuments(query);

  res.json({
    success: true,
    pagination: { total: movieCount, page, limit, totalReturn: limit },
    data: { movies }
  });
});

export { route };
