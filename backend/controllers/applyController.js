const asyncHandler = require('express-async-handler')
const Apply = require('../models/applyModel')
const Profile = require('../models/profileModel')
const Job = require('../models/jobModel')

const getApply = asyncHandler(async (req, res) => {
  const apply = await Apply.find({ user: req.user.id })

  res.status(200).json(apply)
})

const setApply = asyncHandler(async (req, res) => {
  const { job, description } = req.body
  
  if (!job || !description) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  const apply= await Apply.find({ $and: [{ user: req.user.id }, { job: job }] })
  console.log(apply)
  if(apply.length > 0){
    res.status(400)
    throw new Error('Already Applied')
  }

  const profile = await Profile.find({ user: req.user.id })

  if (!profile) {
    res.status(400)
    throw new Error('Profile not found')
  }

  const jobId = await Job.findById(job)

  if (!jobId) {
    res.status(400)
    throw new Error('Job not found')
  }

  const skills = profile.map(profile => profile.skills).flat()
  const email = profile.map(profile => profile.email).flat()
  const mobile = profile.map(profile => profile.mobile).flat()
  const links = profile.map(profile => profile.links).flat()

  const applyDetails = await Apply.create({
    user: req.user.id,
    job: job,
    description,
    email: JSON.stringify(email),
    mobile: JSON.stringify(mobile),
    links,
    skills,
  })



  res.status(200).json(applyDetails)
})

module.exports = { getApply, setApply }