const mongoose = require("mongoose");

const reqString = { type: String, required: true };
const reqNumber = { type: Number, required: true };
const reqArray = { type: Array, required: true };

const movieSchema = new mongoose.Schema(
  {
    images: { type: String, required: true },
    name: reqString,
    category: reqString,
    score: { type: String, required: true },
    time:{ type: String, required: true },
    year: { type: String, required: true },
    description: { type: String, required: true },
    rating: reqNumber,
    like:  { type: Array, required: true },
    comment:  { type: Array, required: true },
    username: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },

);

const movieModel = mongoose.model("movies", movieSchema);

module.exports = movieModel;
