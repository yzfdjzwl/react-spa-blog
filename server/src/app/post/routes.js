const express = require('express');
const router = express.Router();
const {
  getAllPostsByPager,
  getPostByUrl,
} = require('./controller');

router.post('/api/post/pager', getAllPostsByPager);
router.post('/api/post/detail', getPostByUrl);


module.exports = router;
