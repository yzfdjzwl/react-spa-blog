import * as at from './actionTypes';
import axios from 'axios';

export const fetchPostList = () => dispatch => {
  axios
  .get('/api/post/list')
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
