const express = require("express")
const mongoose = require("mongoose")
const ActivityRouter = require("./routes/activity.route");
const cors = require("cors");

const app = express();


require("dotenv").config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/todoapiDB";



app.use(express.json());
app.use("/api", ActivityRouter);
app.use(cors());


app.get("/", (req, res) => {
    res.send("Hello World!");
  });


  mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    app.listen(PORT, console.log("Server stated on port 5000"));
  })
  .catch((err) => {
    console.log(err);
  });