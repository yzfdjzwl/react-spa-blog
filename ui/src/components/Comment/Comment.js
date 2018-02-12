import React, { Component } from 'react';
import './style.css';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      name: '',
      email: '',
      url: '',
      remember: false,
    };
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleRememberChange = this.handleRememberChange.bind(this);
    this.handlePostedClick = this.handlePostedClick.bind(this);
  }

  handleMessageChange(event) {
    this.setState({ message: event.target.value });
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handleUrlChange(event) {
    this.setState({ url: event.target.value });
  }

  handleRememberChange() {
    this.setState({ remember: !this.state.remember });
  }

  handlePostedClick() {
		// TODO: 验证
    this.props.onSubmit(this.state);
  }

  render() {
    return (
      <div className="comment">
        <h2 className="comment-header">我要发表看法</h2>
        <div className="comment-content">
          <p>您的留言</p>
          <p><textarea value={this.state.messgae} onChange={this.handleMessageChange} /></p>
          <div className="comment-content-name">
            <p><label>您的大名:</label></p>
            <p><input placeholder="必填" value={this.state.name} onChange={this.handleNameChange} /></p>
          </div>
          <div className="comment-content-email">
            <p><label>电子邮箱:</label></p>
            <p><input placeholder="必填" value={this.state.email} onChange={this.handleEmailChange} /></p>
          </div>
          <div className="comment-content-url">
            <p><label>个人网站:</label></p>
            <p><input placeholder="选填" value={this.state.url} onChange={this.handleUrlChange} /></p>
          </div>
          <div className="comment-content-remember-me">
						<p>
							<label>记住个人信息?</label>
							<input type="checkbox" checked={this.state.remember} onChange={this.handleRememberChange} />
						</p>
          </div>
        </div>
        <div className="comment-footer">
					<p>
						<button className="comment-footer-submit" onClick={this.handlePostedClick}>发表</button>
					</p>
				</div>
      </div>
    );
  }
}

export default Comment;
