const express = require("express");
const PORT = process.env.PORT || 4000;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/db");
const app = express();

//configure database and mongoose
mongoose.set("useCreateIndex", true);
// mongoose
//   .connect(config.database, { useNewUrlParser: true })
//   .then(() => {
//     console.log("Database is connected");
//   })
//   .catch(err => {
//     console.log({ database_error: err });
//   });

mongoose.connect(config.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB Connected…')
  })
  .catch(err => console.log(err))

// db configuaration ends here

//registering cors
app.use(cors());
// app.use(cors({origin:['http://localhost:8080']}));

//configure body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//configure body-parser ends here

// configire morgan
app.use(morgan("dev"));

// define first route
app.get("/", (req, res) => {
  console.log("Hello MEVN Soldier");
});

//bring in our user routes
const userRoutes = require("./api/user/route/user");
app.use("/", userRoutes);
app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});