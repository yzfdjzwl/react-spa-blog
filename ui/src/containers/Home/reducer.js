import * as at from './actionTypes';

const INIT_STATE = {
  posts: {
    isFetching: true,
    fetchFailed: false,
    postList: [],
    pagination: {
      current: 1,
      total: 1,
      pageSize: 10,
      groups: 5,
      theme: '#009688',
    },
  },
  // if there are other modules, please use object
};

const fetchPostsStart = (state, action) => {
  return Object.assign({}, state, {
    posts: {
      ...state.posts,
      isFetching: true,
    },
  });
};

const fetchPostsSuccess = (state, action) => {
  const { data } = action.data;
  const { postList, total } = data;
  return Object.assign({}, state, {
    posts: {
      ...state.posts,
      isFetching: false,
      postList,
      pagination: {
        ...state.posts.pagination,
        total,
      }
    },
  });
};

const fetchPostsError = (state, action) => {
  return Object.assign({}, state, {
    posts: {
      ...state.posts,
      isFetching: false,
      fetchFailed: true,
    },
  });
};

const updatePaginationCurrent = (state, action) => {
  return Object.assign({}, state, {
    posts: {
      ...state.posts,
      pagination: {
        ...state.posts.pagination,
        current: action.data,
      },
    }
  });
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case at.FETCH_POSTS_START:
      return fetchPostsStart(state, action);
    case at.FETCH_POSTS_SUCCESS:
      return fetchPostsSuccess(state, action);
    case at.FETCH_POSTS_ERROR:
      return fetchPostsError(state, action);
    case at.UPDATE_PAGINATION_CURRENT:
      return updatePaginationCurrent(state, action);
    default:
      return state;
  }
};
