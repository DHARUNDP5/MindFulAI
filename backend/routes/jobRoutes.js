const express = require('express')
const router = express.Router()
const { getJobs, setJob, updateJob, deleteJob, recommendJobs, assignedJobs, completedJob } = require('../controllers/jobController')
const { protect, recruiter, student } = require('../middleware/authMiddleware')

router.route('/').get(protect, recruiter, getJobs).post(protect, recruiter, setJob)
router.route('/:id').put(protect, recruiter, updateJob).delete(protect, recruiter, deleteJob)
router.route('/recommend').get(protect, student, recommendJobs)
router.route('/assigned').get(protect, student, assignedJobs)
router.route('/completed/:id').put(protect, recruiter, completedJob)

module.exports = router