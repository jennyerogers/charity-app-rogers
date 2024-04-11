const { Schema, model, models } = require("mongoose");

const CharitySchema = new Schema(
  {
    ein: {
      type: String,
      required: true,
      unique: true,
    },
    charityName: {
      type: String,
      required: true,
    },
    donationUrl: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
);

module.exports = CharitySchema