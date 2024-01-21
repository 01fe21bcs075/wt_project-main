// models/BatchDetails.js
const mongoose = require('mongoose');

// Subschema for credit hours
const CreditHoursSchema = new mongoose.Schema({
  lectures: { type: Number, default: 0 },
  tutorials: { type: Number, default: 0 },
  labs: { type: Number, default: 0 },
});

// Subschema for each course
const CourseSchema = new mongoose.Schema({
  course_code: { type: String, required: true },
  course_name: { type: String, required: true },
  credit_hours: { type: CreditHoursSchema, required: true },
});

// Main schema for BatchDetails
const BatchDetailsSchema = new mongoose.Schema({
  semester: { type: Number, required: true },
  courses: { type: [CourseSchema], required: true },
  credits: { type: Number, default: 0 },
  batch: { type: String, required: true },

} ,
 {
  collection :"BatchDetails",
});

const BatchDetailsModel = mongoose.model('BatchDetails', BatchDetailsSchema);

module.exports = BatchDetailsModel;
