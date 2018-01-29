import React, { Component } from 'react';
import Nav from '@components/Nav/Nav';
import util from '@common/util';
import Banner from '@components/Banner/Banner';

class MyProjects extends Component {
  render() {
    const info = util.getBannerInfoByPath('projects');
    return (
      <div>
        <Nav />
        <Banner info={info} />
        <div>我的项目页面</div>
      </div>
    );
  }
}

export default MyProjects;
