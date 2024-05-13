const BootCamp = require("../models/BootCamp");

exports.createBootCamp = async (req, res, next) => {
  const bootCamp = await BootCamp.create(req.body);
  res.status(201).json({
    success: true,
    data: bootCamp,
  });
};

exports.getBootCamps = async (req, res, next) => {
  const bootCamps = await BootCamp.find();
  res.status(200).json({
    success: true,
    count: bootCamps.length,
    data: bootCamps,
  });
};

exports.getBootCampById = async (req, res, next) => {
  const bootCamp = await BootCamp.findById(req.params.id);
  if (bootCamp) {
    return res.status(200).json({
      success: true,
      data: bootCamp,
    });
  }
};

exports.updateBootCampById = async (req, res, next) => {
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
};

exports.deleteBootCampById = async (req, res, next) => {
  const bootCamp = await BootCamp.findByIdAndDelete(req.params.id);
  if (bootCamp) {
    res.status(200).json({
      success: true,
    });
  }
};
