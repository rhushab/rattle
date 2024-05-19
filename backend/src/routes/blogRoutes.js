const express = require('express');
const router = express.Router();
const { createBlog } = require('../controllers/blogController');
const { verifyToken } = require('../controllers/authController');

router.post('/create', verifyToken, createBlog);

module.exports = router;
