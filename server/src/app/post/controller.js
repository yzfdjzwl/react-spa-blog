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

  console.log(url);
  const post = await PostModel.findOne({ url });

  reply.send({
    code: 0,
    data: {
      post,
    },
    msg: '',
  });
};

// [POST] /api/post/comment
const postComment = async (request, reply) => {
  const params = request.body;
  const { url, email, name, message, _id, date } = params;
  // TODO: 后端验证
  // TODO: XSS防御

  PostModel.findByIdAndUpdate(_id, {
    $push: {
      comments: {
        url,
        email,
        name,
        message,
        date,
      },
    },
  }, (error, result) => {
    console.log(result);
  });
  reply.send({
    code: 0,
    data: {},
    message: '提交成功!'
  });
};

module.exports = {
  getAllPostsByPager,
  getPostByUrl,
  postComment,
};

