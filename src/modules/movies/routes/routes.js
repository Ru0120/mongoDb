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

route.get("/genre", async (req, res) => {
  let { genre, page = 1, limit = 10 } = req.query;

  page = parseInt(page);
  limit = parseInt(limit);

  if (!genre) {
    res.json({ success: false, message: "genre required" });
  }

  const query = { genres: { $eq: genre } };

  const movies = await movies_collection
    .find(query)
    .skip((page - 1) * limit)
    .limit(limit)
    .toArray();

  const movieCount = await movies_collection.countDocuments(query);

  res.json({
    success: true,
    pagination: { total: movieCount, page, limit, totalReturn: limit },
    data: { movies },
  });
});

route.get("/and", async (req, res) => {
  let { genre, page = 1, limit = 10, year } = req.query;

  page = parseInt(page);
  limit = parseInt(limit);
  year = parseInt(year);

  if (!genre || !year) {
    res.json({ success: false, message: "genre or year required" });
  }

  const query = {
    $or: [{ genre: { $eq: genre } }, { year: { $eq: year } }],
  };

  const movies = await movies_collection
    .find(query)
    .skip((page - 1) * limit)
    .limit(limit)
    .toArray();

  const movieCount = await movies_collection.countDocuments(query);

  res.json({
    success: true,
    pagination: { total: movieCount, page, limit, totalReturn: limit },
    data: { movies },
  });
});
route.get("/imdbID", async (req, res) => {
  const { imdbID } = req.query;
  const id = parseInt(imdbID);
  if (!imdbID) {
    res.json({ success: false, message: "ID required" });
  }

  const movie = await movies_collection.findOne({ "imdb.id": { $eq: id } });

  res.json({ success: true, data: { movie } });
});
route.get("/year", async (req, res) => {
  const { year } = req.query;
  const year1 = parseInt(year);
  if (!year) {
    res.json({ success: false, message: "year required" });
  }

  const movie = await movies_collection.findOne({ year: { $eq: year1 } });

  res.json({ success: true, data: { movie } });
});
route.get("/rating", async (req, res) => {
  const { rating } = req.query;
  const rate = parseInt(rating);
  console.log(typeof rate);
  if (!rate) {
    res.json({ success: false, message: "rating required" });
  }

  const movie = await movies_collection.findOne({
    "imdb.rating": { $eq: rate },
  });

  res.json({ success: true, data: { movie } });
});
route.get("/moreThan10m", async (req, res) => {
  const { moreThan10m } = req.query;
  console.log(moreThan10m);
  const moreThan10mil = parseInt(moreThan10m);
  console.log(moreThan10mil);

  if (!moreThan10mil) {
    res.json({ success: false, message: "moreThan10mil required" });
  }

  const movie = await movies_collection.findOne({
    "imdb.votes": { $gte: moreThan10mil },
  });

  res.json({ success: true, data: { movie } });
});
route.get("/runtime", async (req, res) => {
  const { runtime } = req.query;
  const runTime90min = parseInt(runtime);
  if (!runTime90min) {
    res.json({ success: false, message: "runtime minute required" });
  }

  const movie = await movies_collection.findOne({
    runtime: { $lt: runTime90min },
  });

  res.json({ success: true, data: { movie } });
});
route.get("/director", async (req, res) => {
  let { director, page = 1, limit = 10 } = req.query;

  page = parseInt(page);
  limit = parseInt(limit);

  if (!director) {
    res.json({ success: false, message: "director required" });
    return;
  }

  const query = {
    directors: { $in: [director] },
  };

  const movies = await movies_collection
    .find(query)
    .skip((page - 1) * limit)
    .limit(limit)
    .toArray();

  const movieCount = await movies_collection.countDocuments(query);

  res.json({
    success: true,
    pagination: { total: movieCount, page, limit, totalReturn: limit },
    data: { movies },
  });
});

route.get("/awards", async (req, res) => {
  let { awards, page = 1, limit = 10 } = req.query;

  const award = parseInt(awards);
  page = parseInt(page);
  limit = parseInt(limit);
  if (!awards) {
    res.json({ success: false, message: "awards required" });
  }
  const query = {
    "awards.wins": { $gt: award },
  };

  const movies = await movies_collection
    .find(query)
    .skip((page - 1) * limit)
    .limit(limit)
    .toArray();

  const movieCount = await movies_collection.countDocuments(query);

  res.json({
    success: true,
    pagination: { total: movieCount, page, limit, totalReturn: limit },
    data: { movies },
  });
});
route.get("/languages", async (req, res) => {
  let { languages, page = 1, limit = 10 } = req.query;

  const lan = parseInt(languages);
  page = parseInt(page);
  limit = parseInt(limit);
  if (!languages) {
    res.json({ success: false, message: "language required" });
  }
  const query = {
    languages: { $in: [lan] },
  };

  const movies = await movies_collection
    .find(query)
    .skip((page - 1) * limit)
    .limit(limit)
    .toArray();

  const movieCount = await movies_collection.countDocuments(query);

  res.json({
    success: true,
    pagination: { total: movieCount, page, limit, totalReturn: limit },
    data: { movies },
  });
});

export { route };
