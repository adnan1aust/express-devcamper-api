const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const connectToDB = require("./config/db.connection");
const bootCampsRoutes = require("./routes/bootCamps.route");
const { BOOT_CAMP_ROUTE_V1 } = require("./const/collections");
const morgan = require("morgan");
const errorHandler = require("./middleware/errorHandler.middleware");

dotenv.config({
  path: "./config/config.env",
});

const app = express();
connectToDB();

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

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `SERVER INFO: SERVER IS RUNNING ON PORT ${PORT} ON ${process.env.NODE_ENV} MODE`
      .white.bold
  );
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`GLOBAL ERROR: ${err.message}`.red.bold);
  server.close(() => process.exit(1));
});
