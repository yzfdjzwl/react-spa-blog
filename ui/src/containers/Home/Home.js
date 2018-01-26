import React, { Component } from 'react';
import Counter from '@containers/Counter/Counter';
import TodoList from '@containers/TodoList/TodoList';
import { Link } from 'react-router-dom';

class Home extends Component {
  componentWillMount() {
    // console.error('error....');
  }
  render() {
    return (
      <div>
        I aaam Home Pa111ge....
        <ul>
          <li><Link to="/counter">Counter</Link></li>
          <li><Link to="/todolist">TodoList</Link></li>
        </ul>
      </div>
    )
  }
}

export default Home;
