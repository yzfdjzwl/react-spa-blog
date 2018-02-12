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

export const submitComment = ({
  message,
  name,
  email,
  url,
  _id,
  date,
}, cb) => dispatch => {
  axios
    .post('/api/post/comment', { message, name, email, url, _id, date })
    .then(res => {
      if (res.data.code === 0) {
        dispatch({
          type: at.SUBMIT_COMMENT,
          data: res.data,
        });
        // 重新拉曲
        cb && cb();
      } else {
        // 弹窗提示错误
        // 可以dispatch来做
      }
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
