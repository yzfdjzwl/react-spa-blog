import * as at from './actionTypes';

const INIT_STATE = {
  isFetching: true,
  fetchFailed: false,
  post: {
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case at.FETCH_POST_START:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case at.FETCH_POST_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        post: action.data.data.post,
      });
    case at.FETCH_POST_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        fetchFailed: true,
      });
    default:
      return state;
  }
};
