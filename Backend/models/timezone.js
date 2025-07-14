const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const timezoneSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Timezone", timezoneSchema);
