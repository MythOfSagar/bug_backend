require("dotenv").config();
const connection = require("./config/db");
const express = require("express");
const cors = require("cors");

const {userRouter}=require('./routes/user.route')
const{bugRouter}=require('./routes/bug.route')

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use('/users',userRouter)
app.use('/bugs',bugRouter)

app.get("/", (req, res) => {
  res.send("BUG TRACKER HOME");
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Success in Connection");
  } catch (err) {
    console.log("Error in Connection");
  }
});
