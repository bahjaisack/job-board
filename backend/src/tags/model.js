const mongoose = require("mongoose");
const tagsSchema = mongoose.Schema({
  tags_Id: {
    type: Number,
    require: true,
  },
  tags_name: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("tags", tagsSchema);
