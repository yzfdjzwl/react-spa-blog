const PostModel = require('./model');
const {
  markdownToPlainText,
  postIntercept,
} = require('./../../common/util');

// [POST] /api/post/pager
const getAllPostsByPager = async (request, reply) => {

  console.log(request.body);

  let data = await PostModel.find({}, null, { limit: 10 });

  data = markdownToPlainText(data);
  data = postIntercept(data);

  reply.send({
    code: 0,
    postList: data,
    msg: '',
  });
};

module.exports = {
  getAllPostsByPager,
};
