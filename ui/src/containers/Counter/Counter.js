import React, { Component } from 'react';
import * as CounterActions from './actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const mapStateToProps = ({ counter }) => ({ counter });
const mapDispatchToProps = dispatch => ({
  counterActions: bindActionCreators(CounterActions, dispatch),
});

class Counter extends Component {
  constructor(props) {
    super(props);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleMinusClick = this.handleMinusClick.bind(this);
  }

  handleAddClick() {
    this.props.counterActions.addCounter(() => {
      console.log('hhhh , add');
    });
  }

  handleMinusClick() {
    this.props.counterActions.minusCounter(() => {
      console.log('hhhh , minus');
    });
  }

  render() {
    return (
      <div>
        <div>I am counter Page....</div>
        <button onClick={this.handleAddClick}>点我加1</button>
        <div>{this.props.counter.count}</div>
        <button onClick={this.handleMinusClick}>点我减1</button>
        <Link to="/">回到首页</Link>
      </div>
    )
  }
}

export default  connect(mapStateToProps, mapDispatchToProps)(Counter);
