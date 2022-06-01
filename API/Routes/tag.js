const express = require('express');
const router = express.Router();
const {createTag, getTags} = require('../controllers/tag');
const {getAllBlogsByTag, getNBlogsByTag} = require('../controllers/blog');
const {userAuth} = require('../Auth/userAuth');

//create tag
router.post('/', userAuth, createTag);

//get tags
router.get('/', getTags);

//get all blogs by tag
router.get('/:id', getAllBlogsByTag);

//get all blogs by tag
router.get('/:id/:n', getNBlogsByTag);

module.exports = router;