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
  let query;

  const requestQuery = { ...req.query };

  const removeFields = ["select", "sort", "limit", "page"];

  removeFields.forEach((param) => delete requestQuery[param]);

  let queryStr = JSON.stringify(requestQuery);
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in )\b/g,
    (match) => `$${match}`
  );

  query = BootCamp.find(JSON.parse(queryStr));

  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  if (req.query.sort) {
    const sort = req.query.sort.split(",").join(" ");
    query = query.sort(sort);
  } else {
    query = query.sort("-createdAt");
  }

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);

  const bootCamps = await query;
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
