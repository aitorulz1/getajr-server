const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
      },
    projectImage: {
        type: String,
        default: null,
      },
    linkto: {
        type: String,
        default: null,
      },
    github: {
        type: String,
        default: null,
      },
    created: {
        type: Date,
        default: Date.now(),
      },
    lenguage: {
        type: Array,
        default: null,
      },
    techs: {
        type: Array,
        default: null,
      },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
})

module.exports = mongoose.model('Project', ProjectSchema)