const PostModel = require('./model');
const {
  markdownToPlainText,
  postIntercept,
} = require('./../../common/util');

// [POST] /api/post/pager
const getAllPostsByPager = async (request, reply) => {
  const params = request.body;
  const { current, pageSize } = params;

  let postList = await PostModel.find({}, null, { limit: pageSize, skip: (current - 1) * pageSize });
  const total = await PostModel.find({}, null, {}).count();

  postList = markdownToPlainText(postList);
  postList = postIntercept(postList);

  console.log(postList);

  reply.send({
    code: 0,
    data: {
      postList,
      total,
    },
    msg: '',
  });
};

// [POST] /api/post/detail
const getPostByUrl = async (request, reply) => {
  const params = request.body;
  const { url } = params;

  const post = await PostModel.findOne({ url });
  reply.send({
    code: 0,
    data: {
      post,
    },
    msg: '',
  });
};

module.exports = {
  getAllPostsByPager,
  getPostByUrl
};
