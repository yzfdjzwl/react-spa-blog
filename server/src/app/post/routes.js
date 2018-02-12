const express = require('express');
const router = express.Router();
const {
  getAllPostsByPager,
  getPostByUrl,
  postComment,
} = require('./controller');

router.post('/api/post/pager', getAllPostsByPager);
router.post('/api/post/detail', getPostByUrl);
router.post('/api/post/comment', postComment);


module.exports = router;
