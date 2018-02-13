import React, { Component } from 'react';
import * as PostActions from './actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import util from '@common/util';
import Banner from '@components/Banner/Banner';
import Nav from '@components/Nav/Nav';
import Footer from '@components/Footer/Footer';
import Comment from '@components/Comment/Comment';
import CommentList from '@components/CommentList/CommentList';
import marked from 'marked';
import './style.css';

const mapStateToProps = ({ post }) => ({ post });
const mapDispatchToProps = dispatch => ({
  postActions: bindActionCreators(PostActions, dispatch),
});

class Post extends Component {
  constructor(props) {
    super(props);
    const length = util.getPostBannerInfoLength();
    const index = util.getRandomInteger(length);
    const info = util.getPostBannerInfo(index);
    this.state = { info };
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }

  componentWillMount() {
    const { pathname } = this.props.location;
    const url = util.getUrlLastSegment(pathname);
    this.props.postActions.fetchPostByUrl({ url }, () => {
      window.scroll(0, 0);
    });
  }

  componentWillUnmount() {
    this.props.postActions.clearPost();
  }

  handleCommentSubmit({ message, name, email, url }) {
    const { post } = this.props.post;
    const { _id } = post;
    const date = new Date();

    const { pathname } = this.props.location;
    const _url = util.getUrlLastSegment(pathname);

    return;
    this.props.postActions.submitComment({
      message,
      name,
      email,
      url,
      _id,
      date,
    }, () => {
      this.props.postActions.fetchPostByUrl({ url: _url });
    });
  }

  render() {
    const { post } = this.props.post;
    console.log(post);
    const { title, comments } = post;
    let { info } = this.state;
    info = Object.assign({}, info, { title });

    const html = util.md2HTML(post.content);
       // <CommentList comments={comments} />

    return (
      <div>
        <Nav />
        <Banner info={info} />
        <div className="post-page">
          <div className="markdown-body" dangerouslySetInnerHTML={{__html: html }} />
        </div>
        <Comment onSubmit={this.handleCommentSubmit} />
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
