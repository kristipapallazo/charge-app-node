require("dotenv").config();

import express from "express";
import router from "./routes/routes.ts";

const port = process.env.PORT || 8080;

const app = express();

app.use("/", router);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
