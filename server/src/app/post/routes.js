const express = require('express');
const router = express.Router();
const {
  getAllPostsByPager,
} = require('./controller');

router.post('/api/post/pager', getAllPostsByPager);


module.exports = router;
