import * as at from './actionTypes';
import axios from 'axios';

export const fetchPostList = () => dispatch => {
  axios
  .post('/api/post/pager', { limit: 10 })
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
