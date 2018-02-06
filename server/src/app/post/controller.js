const PostModel = require('./model');
const {
  markdownToPlainText,
  postIntercept,
} = require('./../../common/util');

// [POST] /api/post/pager
const getAllPostsByPager = async (request, reply) => {
  const params = request.body;
  const { current, pageSize } = params;

  let data = await PostModel.find({}, null, { limit: pageSize, skip: (current - 1) * pageSize });

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
