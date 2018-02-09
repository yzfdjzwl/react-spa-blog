import React, { Component } from 'react';
import * as PostActions from './actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import util from '@common/util';
import Banner from '@components/Banner/Banner';
import Nav from '@components/Nav/Nav';
import marked from 'marked';
import './style.css';

const mapStateToProps = ({ post }) => ({ post });
const mapDispatchToProps = dispatch => ({
  postActions: bindActionCreators(PostActions, dispatch),
});

class Post extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { pathname } = this.props.location;
    const url = util.getUrlLastSegment(pathname);
    this.props.postActions.fetchPostByUrl({ url }, () => {
      window.scroll(0, 0);
    });
  }

  render() {
    const length = util.getPostBannerInfoLength();
    const index = util.getRandomInteger(length);
    const { post } = this.props.post;
    const { title = '' } = post;

    let info = util.getPostBannerInfo(index);
    info = Object.assign({}, info, { title });

    const html = util.md2HTML(post.content);

    return (
      <div>
        <Nav />
        <Banner info={info} />
        <div className="post-page">
          <div className="markdown-body" dangerouslySetInnerHTML={{__html: html }} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
