import home from '@containers/Home/reducer';
import post from '@containers/Post/reducer';
import { combineReducers } from 'redux';

export default combineReducers({
  home,
  post,
});
