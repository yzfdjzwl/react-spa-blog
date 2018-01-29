import React, { Component } from 'react';
import './style.css';

class Loading extends Component {
  render() {
    return (
			<div className="lds-css">
				<div className="lds-dual-ring" style={{ width:'100%', height:'100%' }}>
					<div></div>
				</div>
			</div>
    );
  }
}

export default Loading;
