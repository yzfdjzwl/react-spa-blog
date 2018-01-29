import home from './image/home.jpg';
import classification from './image/classification.jpg';
import archive from './image/archive.jpg';
import projects from './image/projects.jpg';
import about from './image/about.jpg';

export default {
  BANNER_INFO: [
    {
      path: 'home',
      title: '动机在未来',
      subTitle: '时间一去不复返',
      bgImage: home,
    },
    {
      path: 'classification',
      title: 'Hi',
      subTitle: '我是01',
      bgImage: classification,
    },
    {
      path: 'archive',
      title: 'Hello World',
      subTitle: '你好，世界',
      bgImage: archive,
    },
    {
      path: 'projects',
      title: '我的项目',
      subTitle: 'Welcome',
      bgImage: projects,
    },
    {
      path: 'about',
      title: '关于我',
      subTitle: '了解我的一切',
      bgImage: about,
    },
  ],
};
