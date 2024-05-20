const express = require('express');
const router = express.Router();
const { createBlog, getAllBlogs } = require('../controllers/blogController');
const { verifyToken } = require('../controllers/authController');

router.post('/create', verifyToken, createBlog);

router.get('/getall', verifyToken, getAllBlogs);

module.exports = router;
