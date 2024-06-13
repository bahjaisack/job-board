const mongoose = require("mongoose");

const applicationSchema = mongoose.Schema({
  userEmail: {
   type: String,
   required: true 
  },
  job_title: {
    type: String,
    required: true,
  },
  coverLetter: {
    type: String,
    require: true,
  },
  resume: {
    type: String,
    require: true,
  },
  createdAt: {
    type: String,
    default: Date.now
  },
  updatedAt: {
    type: String,
    default: Date.now
  },
});

module.exports = mongoose.model("application", applicationSchema);
