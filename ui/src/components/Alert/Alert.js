import React, { Component } from 'react';
import './style.css';

class Alert extends Component {
  render() {
    const { message="testststst" } = this.props;
    return (
      <div className="alert">
        <div className="alert-content">
          <span>{message}</span>
        </div>
      </div>
    );
  }
}

export default Alert;
