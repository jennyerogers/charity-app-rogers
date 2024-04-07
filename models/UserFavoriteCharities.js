const { Schema, model, models } = require("mongoose");
const FavoriteCharitySchema = new Schema(
    {
      user_id: {
        type: String,
        required: true,
      },
      charity_ein: {
        type: String,
        required: true,
      },
    });