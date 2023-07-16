const express = require('express')
const router = express.Router()
const { getProfile, setProfile, updateProfile } = require('../controllers/profileController')
const { protect,  student } = require('../middleware/authMiddleware')

router.route('/').get(protect, student, getProfile).post(protect, student, setProfile)
router.route('/:id').put(protect, student, updateProfile)

module.exports = router