import React, { Component } from 'react';
import './style.css';

class PostItem extends Component {
  componentWillMount() {
    // console.log(this.props.content);
  }
  render() {
    const { post } = this.props;
    return (
      <div className="postItem-container">
        <a href="#">
          <h2>{post.title}</h2>
          <div className="postItem-preview">{post.content}</div>
        </a>
        <p className="postItem-date">Posted on {post.date || 'no-date'}</p>
        <hr />
      </div>
    );
  }
}

export default PostItem;
