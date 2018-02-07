import CONST from '@common/const';

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

export default {
  getPostBannerInfo,
  getBannerInfoByPath,
  getUrlLastSegment,
  getPostBannerInfoLength,
  getRandomInteger,
};
