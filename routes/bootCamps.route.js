const express = require("express");
const {
  createBootCamp,
  getBootCamps,
  getBootCampById,
  updateBootCampById,
  deleteBootCampById,
} = require("./../controllers/bootCamps.controller");
const router = express.Router();

router.route("/").post(createBootCamp).get(getBootCamps);
router
  .route("/:id")
  .get(getBootCampById)
  .put(updateBootCampById)
  .delete(deleteBootCampById);

module.exports = router;
