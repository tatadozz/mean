var Student = require("../models/student");

const { param, body, validationResult } = require("express-validator");

// Create
exports.create = [
  // Check validation
  body("id")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Id must be specified.")
    .isNumeric()
    .withMessage("Id must be a number."),

  body("firstName")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),

  body("lastName")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Last name must be specified.")
    .isAlphanumeric()
    .withMessage("Last name has non-alphanumeric characters."),

  body("class")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Last name must be specified."),

  body("email").isEmail().withMessage("Invalid email"),

  body("dateOfBirth", "Invalid date of birth")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  // Process Request
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create student object with escaped and trimmed data
    var student = new Student({
      _id: req.body.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      class: req.body.class,
      email: req.body.email,
      dateOfBirth: req.body.dateOfBirth,
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      student.save(function (err) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(201).json("Student created successfully !");
      });
    }
  },
];

// Read
exports.getAll = function (req, res, next) {
  Student.find().exec(function (err, result) {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(result);
  });
};

exports.getById = [
  param("id")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Id must be specified.")
    .isNumeric()
    .withMessage("Id must be a number."),

  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      Student.findById(req.params.id).exec(function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).json(result);
      });
    }
  },
];

// Delete
exports.delete = [
  param("id")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Id must be specified.")
    .isNumeric()
    .withMessage("Id must be a number."),

  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      Student.findByIdAndRemove(req.params.id).exec(function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).json("Student deleted successfully !");
      });
    }
  },
];

// Update
exports.update = [
  param("id")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Id must be specified.")
    .isNumeric()
    .withMessage("Id must be a number."),

  body("firstName")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),

  body("lastName")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Last name must be specified.")
    .isAlphanumeric()
    .withMessage("Last name has non-alphanumeric characters."),

  body("class")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Last name must be specified."),

  body("email").isEmail().withMessage("Invalid email"),

  body("dateOfBirth", "Invalid date of birth")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create student object with escaped and trimmed data
    var student = new Student({
      _id: req.params.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      class: req.body.class,
      email: req.body.email,
      dateOfBirth: req.body.dateOfBirth,
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      Student.findByIdAndUpdate(req.params.id, student, function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(201).json("Student updated successfully !");
      });
    }
  },
];