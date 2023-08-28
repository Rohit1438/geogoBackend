const express = require("express");
const connection = require("./db");
const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/movies",  postRouter);

app.listen(8080, async () => {
  try {
    await connection;
    console.log(`connected to DB at port ${8080}`);
  } catch (error) {
    console.log(error.message);
  }
});
