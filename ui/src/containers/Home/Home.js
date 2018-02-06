import React, { Component } from 'react';
import Banner from '@components/Banner/Banner';
import Nav from '@components/Nav/Nav';
import Footer from '@components/Footer/Footer';
import Loading from '@components/Loading/Loading';
import GoTop from '@components/GoTop/GoTop';
import Pagination from '@components/Pagination/Pagination';
import { Link } from 'react-router-dom';
import util from '@common/util';
import PostItem from './components/PostItem/PostItem';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as HomeActions from './actions';
import './style.css';

const mapStateToProps = ({ home }) => ({ home });
const mapDispatchToProps = dispatch => ({
  homeActions: bindActionCreators(HomeActions, dispatch),
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentWillMount() {
    const { pagination } = this.props.home.posts;
    const { pageSize, current } = pagination;

    this.props.homeActions.fetchPostList({
      current,
      pageSize,
    });
  }

  handlePageChange(current) {
    const { pagination } = this.props.home.posts;
    const { pageSize } = pagination;

    this.props.homeActions.fetchPostList({ current, pageSize });
  }

  render() {
    const info = util.getBannerInfoByPath('home');
    const { posts } = this.props.home;
    const { postList, isFetching, pagination } = posts;
    const { total, pageSize, groups, theme, current } = pagination;
    return (
      <div className="home">
        <Nav />
        <Banner info={info} />
        <div className="content-wraper">
          {isFetching ?
            <Loading /> :
            postList.map(post =>
              <PostItem key={Math.random()} post={post} />
            )
          }
          <Pagination
            pagination={{
              total,
              pageSize,
              groups,
              theme,
              current,
            }}
            onChange={this.handlePageChange}
          />
        </div>
        <hr className="home-bottom-line" />
				<GoTop />
        <Footer />
      </div>
    )
  }
}

export default  connect(mapStateToProps, mapDispatchToProps)(Home);
