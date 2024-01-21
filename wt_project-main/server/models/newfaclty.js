const mongoose = require('mongoose');

// Define the schema for the Faculty model
const facultySchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Add any other fields you need for the Faculty model
});

// Create the Faculty model based on the schema
const Faculty = mongoose.model('Faculty', facultySchema);

// Export the Faculty model
module.exports = Faculty;
