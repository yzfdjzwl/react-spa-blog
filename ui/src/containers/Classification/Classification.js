import React, { Component } from 'react';
import Nav from '@components/Nav/Nav';
import util from '@common/util';
import Banner from '@components/Banner/Banner';

class Classification extends Component {
  render() {
    const info = util.getBannerInfoByPath('classification');
    return (
      <div>
        <Nav />
        <Banner info={info} />
        <div>分类页面</div>
      </div>
    );
  }
}

export default Classification;
