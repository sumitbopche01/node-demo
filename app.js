var express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const router = express.Router();
const routes = require("./routes/routes")(router);

var app = express();

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  max: 30,
  keyGenerator: function (req) {
    let key = req.ip;
    if (req.headers["authorization"]) {
      // if authorization is present then use it otherwise use ip
      key = req.headers["authorization"];
    }
    return key;
  },
});

app.use(cors());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", routes);

module.exports = app;
