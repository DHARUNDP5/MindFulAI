const mongoose = require('mongoose')

const profileSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      unique: true,
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
    stipend: {
        type: Number,
        default: 0,
      },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Profile', profileSchema)