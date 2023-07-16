const mongoose = require('mongoose')

const jobSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Please add a name for job'],
    },
    skills: {
      type: [String],
      required: [true, 'Please add an array of skills'],
    },
    stipend: {
      type: Number,
      required: [true, 'Please add a stipend'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    assigned:{
      type: Boolean,
      default: false,
    },
    completed:{
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Job', jobSchema)