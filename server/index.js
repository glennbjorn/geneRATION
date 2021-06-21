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
mongoose.set("useFindAndModify", false);

mongoose
.connect(config.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Database is connected!");
})
.catch(err => {
  console.log({ database_error: err });
});

// db configuaration ends here

//registering cors
app.use(cors({ credentials: true, origin: ["http://localhost:8080"] }));

//configure body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//configure body-parser ends here

// configire morgan
app.use(morgan("dev"));

// define first route
// app.get("/", (req, res) => {
//   console.log("Welcome");
// });

//bring in our user routes
const userRoutes = require("./api/route/user");
const campaignRoutes = require("./api/route/campaign");
const donateRoutes = require("./api/route/donor");
app.use("/", userRoutes);
app.use("/campaign", campaignRoutes);
app.use("/donate", donateRoutes);

// Handle production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/public/'));

  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});

