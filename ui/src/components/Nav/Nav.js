import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class Nav extends Component {
  render () {
    return (
      <div className="nav">
        <div className="nav-left"><a href="/">动机在未来</a></div>
        <div className="nav-right">
          <ul className="clearfix">
            <li><Link to="/">首页</Link></li>
            <li><Link to="/classification">分类</Link></li>
            <li><Link to="/archive">归档</Link></li>
            <li><Link to="/myprojects">我的项目</Link></li>
            <li><Link to="/about">关于我</Link></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Nav;
