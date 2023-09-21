import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes";
import blogRouter from "./routes/blog-routes";

const app = express();

app.use(express.json());
// Use the router for the '/api/user' path
app.use("/api/user", router);
app.use("/api/blog", blogRouter);

mongoose
  .connect(
    "mongodb+srv://rahulprojects96admin:N798igX1a3Or7RgC@cluster0.zwze5x7.mongodb.net/BlogApp?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000, () => {
      console.log("Connected to database and listening to localhost:5000");
    });
  })
  .catch((err) => console.log(err));
