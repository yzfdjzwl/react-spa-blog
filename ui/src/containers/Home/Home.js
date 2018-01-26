import React, { Component } from 'react';
import Banner from '@components/Banner/Banner';
import Nav from '@components/Nav/Nav';
import Counter from '@containers/Counter/Counter';
import TodoList from '@containers/TodoList/TodoList';
import { Link } from 'react-router-dom';
import util from '@common/util';
import homeBg from './image/home.jpg';

class Home extends Component {
  componentWillMount() {
  }
  render() {
    const info = util.getBannerInfoByPath('home');
    return (
      <div>
        <Nav />
        <Banner info={info} />
        <ul>
          <li><Link to="/counter">Counter</Link></li>
          <li><Link to="/todolist">TodoList</Link></li>
        </ul>
      </div>
    )
  }
}

export default Home;
