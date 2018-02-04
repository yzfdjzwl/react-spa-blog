const removeMd = require('remove-markdown');

const markdownToPlainText = (posts) => {
  return posts.map(({ _id, title, content, sort }) => {
    return Object.assign({}, {
      _id,
      title,
      sort,
      content: removeMd(content),
    });
  });
};

const postIntercept = (posts) => {
  return posts.map(({ _id, title, content, sort }) => {
    return Object.assign({}, {
      _id,
      title,
      sort,
      content: `${content.slice(0, 200)}...`,
    });
  });
};

module.exports = {
  markdownToPlainText,
  postIntercept,
};
