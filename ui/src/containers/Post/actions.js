import * as at from './actionTypes';
import axios from 'axios';

export const fetchPostByUrl = ({ url }, cb) => dispatch => {
  dispatch({
    type: at.FETCH_POST_START,
  });

  axios
    .post('/api/post/detail', { url })
    .then(res => {
      dispatch({
        type: at.FETCH_POST_SUCCESS,
        data: res.data,
      });
      cb && cb();
    })
    .catch(error => {
      console.log(error);
    });
};

export const clearPost = () => dispatch => {
  dispatch({
    type: at.CLEAR_POST,
  });
};
