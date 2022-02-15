const mongoose = require("mongoose");
const cities = require("../data/cities");
const position = require("../data/position");
const Projects = require('./project');

const UserSchema = mongoose.Schema({

  // junior or company
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
  junior: {
    type: Boolean,
    default: false,
    required: true,
  },

  // Generales
  register: {
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
  // Company
  company: {
    type: String,
    default: null,
    trim: true,
    minlength: 2,
    maxlength: 30
  },
  // Junior 
  position: {
    type: String,
    default: null,
    enum: position.map((c) => c.position),
  },
  lenguage: {
    type: Array,
    default: null,
  },
  techs: {
    type: Array,
    default: null,
  },
  cms: {
    type: Array,
    default: null,
  },
  design: {
    type: Array,
    default: null,
  }
},
{
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = doc.id;
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
}
);

UserSchema.virtual('projects', {
  ref: Projects.modelName,
  localField: "_id",
  foreignField: "user",
  justOne: false
})

module.exports = mongoose.model("User", UserSchema);
