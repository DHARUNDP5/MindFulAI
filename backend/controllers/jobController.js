const asyncHandler = require('express-async-handler')
const Job = require('../models/jobModel')
const Profile = require('../models/profileModel')

const getJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ user: req.user.id })

  res.status(200).json(jobs)
})

const setJob = asyncHandler(async (req, res) => {
  const { name, skills, stipend, description } = req.body
  
  if (!name || !skills || !stipend || !description) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  const job = await Job.create({
    user: req.user.id,
    name,
    skills,
    stipend,
    description
  })

  res.status(200).json(job)
})

const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id)

  if (!job) {
    res.status(400)
    throw new Error('Job not found')
  }

  if (job.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  if (job.assigned) {
    res.status(401)
    throw new Error('Cannot update an assigned job')
  }

  if (job.completed) {
    res.status(401)
    throw new Error('Cannot update a completed job')
  }

  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedJob)
})

const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id)

  if (!job) {
    res.status(400)
    throw new Error('Job not found')
  }

  if (job.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  if (job.assigned) {
    res.status(401)
    throw new Error('Cannot delete an assigned job')
  }

  if (job.completed) {
    res.status(401)
    throw new Error('Cannot delete a completed job')
  }

  await job.remove()

  res.status(200).json({ id: req.params.id })
})

const recommendJobs = asyncHandler(async (req, res) => {
  const profile = await Profile.find({ user: req.user.id })

  const userSkills = profile.map(profile => profile.skills).flat()

  if (!profile) {
    return res.status(404).json({ message: 'Profile not found or missing skills' })
  }

  const regexPatterns = userSkills.map(skill => new RegExp(skill, 'i'))

  const jobQuery = Job.aggregate([
    {
      $match: {
        skills: {
          $in: regexPatterns
        }
      }
    },
    {
      $addFields: {
        matchedSkills: {
          $size: {
            $filter: {
              input: "$skills",
              cond: {
                $in: ["$$this", regexPatterns]
              }
            }
          }
        }
      }
    },
    {
      $sort: {
        matchedSkills: -1
      }
    },
    {
      $project: {
        _id: 1,
        name: 1,
        skills: 1,
        stipend: 1,
        description: 1,
        createdAt: 1,
      }
    }
  ]);

  jobQuery.exec()
    .then(jobs => {
      res.status(200).json(jobs)
    })
})


const assignedJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ student: req.user.id }).select('-userid')

  res.status(200).json(jobs)
})

const completedJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id)

  if (!job) {
    res.status(400)
    throw new Error('Job not found')
  }

  if (job.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  if (!job.assigned) {
    res.status(401)
    throw new Error('Job not assigned to anyone')
  }

  const updatedJob = await Job.findByIdAndUpdate(req.params.id, {completed: true}, {
    new: true,
  })

  const updateStipend = await Profile.findByIdAndUpdate(req.params.id, {$inc: {stipend: job.stipend}}, {
    new: true,
  }).select('-user').select('-stipend')


  res.status(200).json(updatedJob, updateStipend)
})

module.exports = { getJobs, setJob, updateJob, deleteJob, recommendJobs, assignedJobs, completedJob }