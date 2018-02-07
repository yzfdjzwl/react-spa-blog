const removeMd = require('remove-markdown');

const markdownToPlainText = (posts) => {
  return posts.map(({ _id, title, content, sort, url }) => {
    return Object.assign({}, {
      _id,
      title,
      sort,
      url,
      content: removeMd(content),
    });
  });
};

const postIntercept = (posts) => {
  return posts.map(({ _id, title, content, sort, url }) => {
    return Object.assign({}, {
      _id,
      title,
      sort,
      url,
      content: `${content.slice(0, 200)}...`,
    });
  });
};

module.exports = {
  markdownToPlainText,
  postIntercept,
};
