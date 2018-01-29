import * as at from './actionTypes';

const INIT_STATE = {
  posts: {
    isFetching: true,
    fetchFailed: false,
    postList: [],
  },
  // if there are other modules, please use object
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case at.FETCH_POSTS_START:
      return Object.assign({}, state, {
        posts: {
          isFetching: true,
        }
      });
    case at.FETCH_POSTS_SUCCESS:
      return Object.assign({}, state, {
        posts: {
          isFetching: false,
          postList: action.data.postList,
        }
      });
    case at.FETCH_POSTS_SUCCESS:
      return Object.assign({}, state, {
        posts: {
          isFetching: false,
          fetchFailed: true,
        }
      });
    default:
      return state;
  }
};
