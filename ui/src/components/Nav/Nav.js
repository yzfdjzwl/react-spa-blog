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
            <li><a href="#">首页</a></li>
            <li><a href="#">关于我</a></li>
            <li><a href="#">归档</a></li>
            <li><a href="#">哈哈</a></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Nav;
