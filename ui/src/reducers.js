import counter from '@containers/Counter/reducer';
import todolist from '@containers/TodoList/reducer';
import { combineReducers } from 'redux';

export default combineReducers({
  counter,
  todolist,
});
