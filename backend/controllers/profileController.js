const asyncHandler = require('express-async-handler')
const Profile = require('../models/profileModel')

const getProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.find({ user: req.user.id })

  res.status(200).json(profile)
})

const setProfile = asyncHandler(async (req, res) => {
  const { skills, email, mobile, links } = req.body
  
  if (!skills || !email || !mobile || !links) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  const profileDetails = await Profile.create({
    user: req.user.id,
    skills,
    email,
    mobile,
    links
  })

  res.status(200).json(profileDetails)
})

const updateProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findById(req.params.id)

  if (!profile) {
    res.status(400)
    throw new Error('Profile not found')
  }

  if (profile.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedProfile = await Profile.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedProfile)
})

module.exports = { getProfile, setProfile, updateProfile }