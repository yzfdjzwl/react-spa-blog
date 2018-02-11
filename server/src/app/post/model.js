const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  // 标题
  title: String,
  // 内容
  content: String,
  // 日期
  date: { type: Date, deafult: Date.now },
  // 分类
  sort: String,
  // xx-xx-xx, 用于url
  url: String,
  // 是否置顶
});


const PostModel = mongoose.model('Post', postSchema);
module.exports = PostModel;
