const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const bootCampsRoutes = require("./routes/bootCamps.route");
const { BOOT_CAMP_ROUTE_V1 } = require("./const/collections");
const morgan = require("morgan");

dotenv.config({
  path: "./config/config.env",
});

const app = express();

app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(
    morgan(function (tokens, req, res) {
      const apiRoute = [
        `${tokens.method(req, res)}:`,
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, "content-length"),
        "-",
        tokens["response-time"](req, res),
        "ms",
      ].join(" ");
      return apiRoute.cyan;
    })
  );
}
app.use(BOOT_CAMP_ROUTE_V1, bootCampsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `INFO: SERVER IS RUNNING ON PORT ${PORT} ON ${process.env.NODE_ENV} MODE`
      .white.bold
  );
});
