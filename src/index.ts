import express from "express";
import router from "./routes/routes.ts";
import cors from "cors";
require("dotenv").config();

const port = process.env.PORT || 8080;

const app = express();

//use cors and json middlewares
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
