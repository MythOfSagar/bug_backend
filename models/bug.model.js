const mongoose = require("mongoose");

const bugSchema = mongoose.Schema({
  title: String,
  type: String,
});

const BugModel = mongoose.model("bugs", bugSchema);

module.exports = { BugModel };
