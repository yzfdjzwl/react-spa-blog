import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class PostItem extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    // console.log(this.props.content);
  }
  render() {
    const { post, history } = this.props;
    const { url } = post;
    return (
      <div className="postItem-container">
        <Link to={{ pathname: `/post/detail/${url}` }}>
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
