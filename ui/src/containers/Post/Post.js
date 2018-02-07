import React, { Component } from 'react';
import * as PostActions from './actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import util from '@common/util';
import Banner from '@components/Banner/Banner';
import Nav from '@components/Nav/Nav';
import ReactMarkdown from 'react-markdown';

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
    let info = util.getPostBannerInfo(index);
    const { post } = this.props.post;
    const { title = '' } = post;
    info = Object.assign({}, info, { title });

    return (
      <div>
        <Nav />
        <Banner info={info} />
        <div>
          <ReactMarkdown source={post.content} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
