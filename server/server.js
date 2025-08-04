require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 3000
const cors = require("cors");
const connectDB = require("./config/mongodbConnection");
const { log } = require("console");

connectDB();
app.use(cors());
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/users", require("./routes/userRoutes"))
app.use("/categories", require("./routes/categoryRoutes"))
app.use("/monthcards", require("./routes/monthCardRoutes"))
app.use("/auth", require("./routes/authRoutes"))



app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

mongoose.connection.on("error", (err) => {
  log(err);
});

app.listen(PORT, () => log("Server started on port 3000"));
