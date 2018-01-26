import * as at from './actionTypes';

const INIT_STATE = {
  count: 0,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case at.ADD:
      return Object.assign({}, state, {
        count: state.count + 1,
      });
    case at.MINUS:
      return Object.assign({}, state, {
        count: state.count - 1,
      });
    default:
      return state;
  }
};
