import Home from '@containers/Home/Home';
import Classification from '@containers/Classification/Classification';
import Archive from '@containers/Archive/Archive';
import MyProjects from '@containers/MyProjects/MyProjects';
import About from '@containers/About/About';
import Post from '@containers/Post/Post';

export const createRoutes = () => [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/post/list/:current',
    component: Home,
  },
  {
    path: '/post/detail/:id',
    component: Post,
  },
  {
    path: '/classification',
    component: Classification,
    exact: true,
  },
  {
    path: '/archive',
    component: Archive,
    exact: true,
  },
  {
    path: '/myprojects',
    component: MyProjects,
    exact: true,
  },
  {
    path: '/about',
    component: About,
    exact: true,
  },
];
