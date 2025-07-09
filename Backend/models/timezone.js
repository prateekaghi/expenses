const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const timezoneSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  date_created: {
    type: Date,
    required: false,
  },
  date_updated: {
    type: Date,
    required: false,
  },
});

module.exports = mongoose.model("Timezone", timezoneSchema);
