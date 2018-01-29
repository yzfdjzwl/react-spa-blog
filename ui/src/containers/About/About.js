import React, { Component } from 'react';
import Nav from '@components/Nav/Nav';
import util from '@common/util';
import Banner from '@components/Banner/Banner';

class About extends Component {
  render() {
    const info = util.getBannerInfoByPath('about');
    return (
      <div>
        <Banner info={info} />
        <Nav />
        <div>关于页面</div>
      </div>
    );
  }
}

export default About;
