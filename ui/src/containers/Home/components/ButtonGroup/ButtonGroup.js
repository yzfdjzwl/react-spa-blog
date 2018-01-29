import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class ButtonGroup extends Component {
  render() {
    return (
      <div className="button-group clearfix">
        <Link className="previous" to="/">← Newer Posts</Link>
        <Link className="next" to="/">Older Posts →</Link>
      </div>
    );
  }
}

export default ButtonGroup;
