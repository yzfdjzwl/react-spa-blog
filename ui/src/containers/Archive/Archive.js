import React, { Component } from 'react';
import Nav from '@components/Nav/Nav';
import util from '@common/util';
import Banner from '@components/Banner/Banner';

class Archive extends Component {
  render() {
    const info = util.getBannerInfoByPath('archive');
    return (
      <div>
        <Nav />
        <Banner info={info} />
        <div>归档页面</div>
      </div>
    );
  }
}

export default Archive;
