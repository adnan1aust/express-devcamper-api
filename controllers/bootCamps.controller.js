const BootCamp = require("../models/BootCamp");
const asyncHandler = require("../middleware/asyncHandler.middleware");

exports.createBootCamp = asyncHandler(async (req, res, next) => {
  const bootCamp = await BootCamp.create(req.body);
  res.status(201).json({
    success: true,
    data: bootCamp,
  });
});

exports.getBootCamps = asyncHandler(async (req, res, next) => {
  const bootCamps = await BootCamp.find();
  res.status(200).json({
    success: true,
    count: bootCamps.length,
    data: bootCamps,
  });
});

exports.getBootCampById = asyncHandler(async (req, res, next) => {
  const bootCamp = await BootCamp.findById(req.params.id);
  if (bootCamp) {
    return res.status(200).json({
      success: true,
      data: bootCamp,
    });
  } else {
    return res.status(404).json({
      success: false,
      error: "Bootcamp not found with id " + req.params.id,
    });
  }
});

exports.updateBootCampById = asyncHandler(async (req, res, next) => {
  const bootCamp = await BootCamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (bootCamp) {
    return res.status(200).json({
      success: true,
      data: bootCamp,
    });
  }
});

exports.deleteBootCampById = asyncHandler(async (req, res, next) => {
  const bootCamp = await BootCamp.findByIdAndDelete(req.params.id);
  if (bootCamp) {
    res.status(200).json({
      success: true,
    });
  }
});
