import Counter from '@containers/Counter/Counter';
import TodoList from '@containers/TodoList/TodoList';
import Home from '@containers/Home/Home';

export const createRoutes = () => [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/todolist',
    component: TodoList,
    exact: true,
  },
  {
    path: '/counter',
    component: Counter,
    exact: true,
  },
];
