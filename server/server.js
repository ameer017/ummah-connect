require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/DBConnect");

const app = express();

//serve static files

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    optionSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("/auth", require("./routes/authRoute"));
app.use("/content", require("./routes/contentRoute"));
app.use("/discussion", require("./routes/forumRoute"));

const PORT = process.env.PORT || 5000;

connectDB();
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, console.log(`Server up and running on port ${PORT}`));
});
