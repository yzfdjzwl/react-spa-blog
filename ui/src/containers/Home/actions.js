import * as at from './actionTypes';
import axios from 'axios';

export const fetchPostList = ({ current, pageSize }, cb) => dispatch => {
  dispatch({
    type: at.UPDATE_PAGINATION_CURRENT,
    data: current,
  });

  dispatch({
    type: at.FETCH_POSTS_START,
  });

  axios
  .post('/api/post/pager', { current, pageSize })
  .then(res => {
    const { data } = res;
    // notice: res.data.data is the real data
    dispatch({
      type: at.FETCH_POSTS_SUCCESS,
      data,
    });
    cb && cb();
  })
  .catch(error => {
    console.log(error);
  });
};
