const mongoose = require("mongoose");
const cities = require("../data/cities");
const position = require("../data/position");
const lenguages = require("../data/lenguages");
const JuniorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  surname: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 3,
    default: null,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
  },
  registro: {
    type: Date,
    default: Date.now(),
  },
  profileImage: {
    type: String,
    default: null,
  },
  city: {
    type: String,
    default: null,
    enum: cities.map((c) => c.cities),
  },
  position: {
    type: String,
    default: null,
    enum: position.map((c) => c.position),
  },
  lenguages: {
    type: String,
    default: null,
    enum: lenguages.map((c) => c.lenguages),
  },
});

module.exports = mongoose.model("Junior", JuniorSchema);
