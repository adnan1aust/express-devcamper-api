const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

const BootCamp = require("./models/BootCamp");

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

const bootCamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

const importData = async () => {
  try {
    await BootCamp.create(bootCamps);
    console.log("DATA IMPORTED SUCCESSFULLY".green);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

const deleteData = async () => {
  try {
    await BootCamp.deleteMany();
    console.log("DATA DELETED SUCCESSFULLY".green);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
