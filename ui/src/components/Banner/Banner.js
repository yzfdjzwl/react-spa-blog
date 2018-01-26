import React, { Component } from 'react';
import './style.css';

class Banner extends Component {
  render() {
    const { info } = this.props;
    return (
      <div className="banner-container" style={{ backgroundImage: `url(${info.bgImage})` }}>
        <div className="banner-inner">
          <h1>{info.title}</h1>
          <div className="banner-middle"></div>
          <h2>{info.subTitle}</h2>
        </div>
      </div>
    );
  }
}

export default Banner;
