const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  content: String,
  date: { type: Date, deafult: Date.now },
  sort: String,
});


const PostModel = mongoose.model('Post', postSchema);
module.exports = PostModel;
