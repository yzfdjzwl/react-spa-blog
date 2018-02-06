import * as at from './actionTypes';
import axios from 'axios';

export const fetchPostList = ({ current, pageSize }) => dispatch => {
  dispatch({
    type: at.UPDATE_PAGINATION_CURRENT,
    data: current,
  });

  axios
  .post('/api/post/pager', { current, pageSize })
  .then(res => {
    dispatch({
      type: at.FETCH_POSTS_SUCCESS,
      data: res.data,
    });
  })
  .catch(error => {
    console.log(error);
  });
};
