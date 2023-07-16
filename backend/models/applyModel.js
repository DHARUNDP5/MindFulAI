const mongoose = require('mongoose')

const applySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Job',
      },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    skills: {
      type: [String],
      required: [true, 'Please add an array of skills'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
    },
    mobile: {
      type: String,
      required: [true, 'Please add a mobile number'],
    },
    links: {
        type: [String],
        required: [true, 'Please add an array links'],
      },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Apply', applySchema)