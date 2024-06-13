const mongoose = require("mongoose");

const jobsSchema = mongoose.Schema({
  job_Id: {
    unique: true,
    type: Number,
    require: true,
  },
  job_title: {
    type: String,
    require: true,
  },
  discription: {
    type: String,
    require: true,
  },
  requirements: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
  salary: {
    type: Number,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  employer_user_id: {
    type: Number,
    require: true,
  },
  employer_company_name: {
    type: String,
    require: true,
  },
  employer_website: {
    type: String,
    require: true,
  },
  createdAt: {
    type: String,
    default: Date.now,
  },
  updatedAt: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model("jobs", jobsSchema);
