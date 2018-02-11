import React, { Component } from 'react';
import util from '@common/util';
import { Link } from 'react-router-dom';
import './style.css';

class PostItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { post, history } = this.props;
    const { url } = post;
    const pathname = `/post/detail/${url}`;
    return (
      <div className="postItem-container">
        <Link to={{ pathname }}>
          <h2>{post.title}</h2>
          <div className="postItem-preview">{post.content}</div>
        </Link>
        <p className="postItem-date">Posted on {post.date || 'no-date'}</p>
        <hr />
      </div>
    );
  }
}

export default PostItem;
