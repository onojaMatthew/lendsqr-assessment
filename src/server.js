import path from "path";
require("dotenv").config({ path: path.resolve(__dirname + "./.env")});
import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./middleware/router";
// import { prod } from "./middleware/prod";

const port = process.env.PORT || 4700;

const app = express();

// prod(app);
// db();
app.use(morgan("combined"));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.locals.role = null;
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "WELCOME LENDSQR ASSESSMENT API" });
});

router(app);

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});

export default app;