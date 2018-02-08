import CONST from '@common/const';
import marked from 'marked';
// import highlight from 'highlight.js';
import hljs from 'highlight.js';

const getPostBannerInfoLength = () => {
  return CONST.POST_BANNER_INFO.length;
};

const getBannerInfoByPath = (path) => {
  const bannerInfo = CONST.BANNER_INFO;
  const info = typeof path === 'string' ? bannerInfo.find(x => x.path === path) : bannerInfo[path];
  return info;
};

const getPostBannerInfo = (index) => {
  const postBannerInfo = CONST.POST_BANNER_INFO;
  const info =  postBannerInfo[index];
  return info;
};

// https://stackoverflow.com/questions/4758103/last-segment-of-url
const getUrlLastSegment = (url) => {
  return url.slice(url.lastIndexOf('/') + 1);
};

// generate [n, m] random integer
// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
const getRandomInteger = (min, max) => {
  // [0, min - 1]
  if (min && !max) {
    return Math.floor(Math.random() * min);
  }
  // [n, m]
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// use marked: https://github.com/chjj/marked
const md2HTML = (content) => {
  const renderer = new marked.Renderer();
  const toc = [];

  renderer.heading = function(text, level, raw) {
    const anchor = this.options.headerPrefix + raw.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-');
    toc.push({
      anchor,
      level,
      text,
    });
    return `<h${level} id=${anchor}>${text}</h${level}>\n`;
  };

  marked.setOptions({
    highlight: code => { return hljs.highlightAuto(code).value; },
    renderer: renderer,
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: true,
    sanitize: true,
    smartLists: true,
    smartypants: true,
    xhtml: true,
  });

  return marked(content);
};

export default {
  getPostBannerInfo,
  getBannerInfoByPath,
  getUrlLastSegment,
  getPostBannerInfoLength,
  getRandomInteger,
  md2HTML,
};
