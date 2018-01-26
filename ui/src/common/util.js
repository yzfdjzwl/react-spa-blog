import CONST from '@common/const';

const getBannerInfoByPath = (path) => {
  const bannerInfo = CONST.BANNER_INFO;
  const info = bannerInfo.find(x => x.path === path) || {};
  return info;
};

export default {
  getBannerInfoByPath,
};
