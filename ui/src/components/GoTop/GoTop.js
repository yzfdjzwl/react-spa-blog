import React, { Component } from 'react';
import './style.css';

class GoTop extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
		window.scroll(0, 0);
		// TODO: 加速上滑
  }

  render() {
    return (
      <div className="go-top">
        <a title="回到顶部" onClick={this.handleClick}></a>
      </div>
    );
  }
}

export default GoTop;
