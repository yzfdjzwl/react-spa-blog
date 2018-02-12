import React, { Component } from 'react';
import './style.css';

class CommentList extends Component {
  render() {
    const { comments } = this.props;
    return (
      <div>
        { comments.length < 1 ? null:
          <div>
            {comments.map(comment =>
              <div key={Math.random()}>{comment.name}</div>
            )}
          </div>
        }
      </div>
    );
  }
}

export default CommentList;
