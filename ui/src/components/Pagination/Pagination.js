import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

/*
 *
 * 参考: https://github.com/sentsin/layui/blob/master/src/lay/modules/laypage.js
 * data: 2018-02-05
 *
 * props:
 *   pagination(object)
 *     total 总共数据条数
 *     pageSize 每页的数据
 *     current 当前页码
 *     groups 一个页面组的连续页码数
 *     theme 按钮背景颜色
 *   onChange 回调事件
 *
 * compute:
 *   index 当前页面组
 *   pages 页码数
 *
 */

class Pagination extends Component {
  constructor(props) {
    super(props);

    this.initialize = this.initialize.bind(this);
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.initialize(props, true);
  }

  initialize(props, firstRender) {
    const { pagination } = props;
    const {
      total = 1,
      pageSize = 1,
      current = 1,
      groups = 5,
      theme = 'red',
    } = pagination;

    const pages = Math.floor(total / pageSize);
    const index = pages > groups ? Math.ceil( (current + (groups > 1 ? 1 : 0)) / (groups > 0 ? groups : 1) ) : 1;
    const state = {
      total,
      pageSize,
      current,
      groups,
      index,
      pages,
    };
    if (firstRender) {
      this.state = state;
      return;
    }
    this.setState(state);
  }

  componentWillReceiveProps(nextProps) {
    this.initialize(nextProps, false);
  }

  handleChange(current) {
    this.props.onChange(current);
  }

  prev() {
    return <Link to="">上一页</Link>;
  }

  next() {
    return `<a>下一页</a>`
  }

  page() {
    const { total, pageSize, current, index, groups, pages } = this.state;
    const pager = [];

    // 数据量为0的时候
    if (total < 1) {
      return null;
    }

    // 首页
    if (index > 1) {
      pager.push(<a key={1} onClick={() => this.handleChange(1)}>1</a>);
    }

    // 计算当前页码组的起始页
    let halve = Math.ceil((groups - 1) / 2),
          start = index > 1 ? (current - halve) : 1,
          end = index > 1 ? (() => {
            const max = current + (groups - halve - 1);
            return max > pages ? pages : max;
          })() : groups;

    // 防止最后一组出现“不规定”的连续页码数
    if (end - start < groups - 1) {
      start = end - groups + 1;
    }

    // 输出左分割符
    if (start > 2) {
      pager.push(<span>...</span>);
    }

    // 输出连续页码
    for(; start <= end; start++) {
      if (start === current) {
        pager.push(<span style={{ color: 'red' }}>{ current }</span>);
      } else {
        pager.push(<Link to={{ pathname:'/list', search:`?page=${start}` }} key={start} onClick={(start => {
          return () => this.handleChange(start)
        })(start)}>{ start }</Link>);
      }
    }

    // 输出右分隔符 & 末页
    if (pages > groups && pages > end) {
      if (end + 1 < pages) {
        pager.push(<span>...</span>);
      }
      if (groups !== 0) {
        pager.push(<a key={pages} onClick={() => this.handleChange(pages)}>{ pages }</a>);
      }
    }

    return (
      <div>
        {pager.map(x => x)}
      </div>
    );
  }

  render() {
    const that =this;
    return (
      <div>
        {this.prev()}
        {this.page()}
        <div dangerouslySetInnerHTML={{ __html: that.next() }} />
      </div>
    );
  }
}

export default Pagination;
