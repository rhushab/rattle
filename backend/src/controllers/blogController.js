const Blog = require('../models/Blog');

const createBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const newBlog = new Blog({
      title,
      content,
      author,
    });
    await newBlog.save();
    return res.status(201).json({ message: 'Blog created successfully' });
  } catch (error) {
    return res.status(200).json({ message: 'Server error', error });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { createBlog, getAllBlogs };
