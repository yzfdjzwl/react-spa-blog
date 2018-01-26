import * as at from './actionTypes';

export const addCounter = (cb) => dispatch => {
  setTimeout(() => {
    dispatch({
      type: at.ADD,
    });
  }, 500);
  cb && cb();
}

export const minusCounter = (cb) => dispatch => {
  setTimeout(() => {
    dispatch({
      type: at.MINUS,
    });
  }, 500);
  cb && cb();
};
