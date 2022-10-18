require("dotenv").config();  // for .env file
const express = require("express");  // for using api creation 
const app = express();
const bodyParser = require("body-parser"); // for request data get
const cors = require("cors"); // cros platform 
const mongoose = require("mongoose"); // connection for mongodb

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//DB Connection

mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

//My routes
const register = require("./routes/register");            

// //My Routes
app.use("/api", register);

// manage docs
// app.use('/books_Image', express.static('./books_Image'));


//PORT
const port = process.env.PORT || 8000;

//Starting a server
app.listen(port, () => {
    console.log(`app is running at`, port);
});