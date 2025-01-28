import { MongoClient } from "mongodb";
import { app } from "./app.js";

const uri =
  "mongodb+srv://3nh3e3:nkgs9p3YSonmvT8R@cluster0.awwtm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

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
