const express = require('express')
const router = express.Router()
const { getApply, setApply } = require('../controllers/applyController')
const { protect,  student } = require('../middleware/authMiddleware')

router.route('/').get(protect, student, getApply).post(protect, student, setApply)

module.exports = router