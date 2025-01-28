import { app } from "./app.js";
import { client } from "./mongo.js";

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
