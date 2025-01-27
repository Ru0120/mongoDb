import express from "express";
import { MongoClient } from "mongodb";

const app = express();

const uri =
  "mongodb+srv://3nh3e3:nkgs9p3YSonmvT8R@cluster0.awwtm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

app.get("/", async (req, res) => {
  const { page } = req.query;

  const db = client.db("sample_mflix");

  const movies = await db
    .collection("comments")
    .find()
    .limit(20)
    .skip((page - 1) * 20)
    .toArray();

  res.send(movies);
});

app.get("/test", async (req, res) => {
  const db = client.db("test");

  const movies = await db.collection("test").find().toArray();

  res.send(movies);
});

app.post("/test", async (req, res) => {
  const db = client.db("test");

  const result = await db.collection("test").find({});

  res.send(result);
});

app.delete("/test", async (req, res) => {
  const { name } = req.query;

  const db = client.db("test");

  const result = await db.collection("test").deleteOne({ name });

  res.send(result);
});

client
  .connect()
  .then(() => {
    app.listen(3000, () => {
      console.log("server started on 3000");
    });
  })
  .catch(() => {
    console.log("conection error");
  });
