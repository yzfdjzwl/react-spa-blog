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
      theme = '#009688',
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
			theme,
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
    const { current, pages } = this.state;
    const { pathname } = this.props.pagination;
	  if (current === 1) {
      return (
				<a 
					href="javascript:;"
					className="p-item-disabled p-item"
				>上一页</a>
			);
    }
    return (
      <Link
        to={{ pathname: `${pathname}/${current - 1}` }}
        onClick={() => this.handleChange(current - 1)}
				className="p-item"
      >上一页</Link>
    );

  }

  next() {
    const { current, pages } = this.state;
    const { pathname } = this.props.pagination;
    if (current === pages) {
			return (
				<a 
					href="javascript:;"
					className="p-item-disabled p-item p-next"
				>下一页</a>
			);
    }
    return (
      <Link
        to={{ pathname: `${pathname}/${current + 1}` }}
        onClick={() => this.handleChange(current + 1)}
				className="p-item p-next"
      >下一页</Link>
    );
  }

  page() {
    const { total, pageSize, current, index, groups, pages, theme } = this.state;
    const { pathname } = this.props.pagination;
    const pager = [];

    // 数据量为0的时候
    if (total < 1) {
      return null;
    }

    // 首页
    if (index > 1) {
      pager.push(
				<Link
					 to={{ pathname: `${pathname}/1`}}
					 onClick={() => this.handleChange(1)}
					className="p-item"
				>1</Link>
				);
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
      pager.push(<span className="p-item">...</span>);
    }

    // 输出连续页码
    for(; start <= end; start++) {
      if (start === current) {
        pager.push(
					<span
						className="p-item"
						style={{ backgroundColor: theme, color: '#fff' }}
					>{ current }</span>
				);
      } else {
        pager.push(
					<Link
				 		to={{ pathname:`${pathname}/${start}` }}
						onClick={(start => {
 		          return () => this.handleChange(start)
        		})(start)}
						className="p-item"
					>{ start }</Link>
				);
      }
    }

    // 输出右分隔符 & 末页
    if (pages > groups && pages > end) {
      if (end + 1 < pages) {
        pager.push(
					<span
						className="p-item"
					>...</span>
				);
      }
      if (groups !== 0) {
        pager.push(
					<Link
					  to={{ pathname: `${pathname}/${pages}` }}
						onClick={() => this.handleChange(pages)}
						className="p-item"
					>{ pages }</Link>
				);
      }
    }

    return (
      <div className="p-middle">
        {pager.map(x =>
          <span key={Math.random()}>{x}</span>
        )}
      </div>
    );
  }

  render() {
    const that =this;
    return (
      <div className="pagination-wrapper">
        <div className="pagination-inner">
          {this.prev()}
          {this.page()}
          {this.next()}
        </div>
      </div>
    );
  }
}

export default Pagination;
