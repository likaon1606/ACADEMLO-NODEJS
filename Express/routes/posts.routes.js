const express = require('express');

//POST CONTROLLER
const { getAllPosts, createPost } = require('../controllers/posts.controller');

const router = express.Router();

router.get('/', getAllPosts);

router.post('/', createPost);

module.exports = { postsRouter: router };