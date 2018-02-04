import React, { Component } from 'react';
import Banner from '@components/Banner/Banner';
import Nav from '@components/Nav/Nav';
import Footer from '@components/Footer/Footer';
import Loading from '@components/Loading/Loading';
import GoTop from '@components/GoTop/GoTop';
import { Link } from 'react-router-dom';
import util from '@common/util';
import PostItem from './components/PostItem/PostItem';
import ButtonGroup from './components/ButtonGroup/ButtonGroup';
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
  }

  componentWillMount() {
    this.props.homeActions.fetchPostList();
  }

  render() {
    const info = util.getBannerInfoByPath('home');
    const { postList, isFetching } = this.props.home.posts;
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
          <ButtonGroup />
        </div>
        <hr className="home-bottom-line" />
				<GoTop />
        <Footer />
      </div>
    )
  }
}

export default  connect(mapStateToProps, mapDispatchToProps)(Home);
