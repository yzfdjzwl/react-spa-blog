# 目录

<!-- vim-markdown-toc GFM -->
* [写在前面](#写在前面)
* [项目结构init](#项目结构init)
* [webpack](#webpack)
* [babel](#babel)
  * [介绍](#介绍)
  * [步骤](#步骤)
* [React](#react)
* [命令优化](#命令优化)
* [配置别名](#配置别名)
* [react-router](#react-router)
* [webpack-dev-server](#webpack-dev-server)
  * [优化](#优化)
  * [--inline与--hot](#--inline与--hot)
* [模块热替换](#模块热替换)
* [redux、react-redux以及中间件](#reduxreact-redux以及中间件)
* [使用source map](#使用source-map)
* [loader](#loader)
  * [加载CSS](#加载css)
  * [加载图片](#加载图片)
* [Plugins](#plugins)
* [Ajax](#ajax)
  * [代理与跨域](#代理与跨域)
* [其他](#其他)

<!-- vim-markdown-toc -->

## 写在前面

这是一个从0开始搭建的一个单页面的项目，目的是为了了解React单页面项目的运行过程，之前也维护了好多个React的SPA，但是只是简单的写业务代码，实际上就是写写React, 连webpack都不会用,其他的都是脚手架搭建好的，对于初学的话，还是用脚手架搭建项目，然后快速上手就ok了。但是自己也不应该算是初学了，因此搞了个这个来巩固自己的基础知识。此文章大部分内容都是来自[这位大佬](https://github.com/brickspert/blog/issues/1#path)的，但是为何自己还要"抄"一次，原因很简单，我想要走一下搭建项目的流程。

目录结构:

```javascript
├── dist                            // 编译打包后的文件目录
├── node_modules
├── package.json
├── README.md
├── src
│   ├── common                      // 公共的部分
│   ├── components                  // 展示组件
│   ├── containers                  // 容器组件
│   │   ├── Counter
│   │   │   ├── Counter.js          // 组件
│   │   │   ├── actionTypes.js      // action类型
│   │   │   ├── actions.js          // action
│   │   │   ├── index.css           // 组件样式
│   │   │   └── reducer.js          // reducer
│   │   ├── Home
│   │   │   ├── Home.js
│   │   │   └── index.css
│   │   └── TodoList
│   │       ├── TodoList.js
│   │       ├── actionTypes.js
│   │       ├── actions.js
│   │       ├── index.css
│   │       └── reducer.js
│   ├── index.js                    // 入口
│   ├── reducers.js                 // 所有的reducer
│   └── routes.js                   // 所有的路由
├── examples                        // 临时的文件
│   ├── index.js
│   └── routes.js
└── webpack
    └── webpack.dev.config.js
```

## 项目结构init

* 首先创建项目文件夹，`mkdir react-spa-blog && cd react-spa-blog`。
* 初始化项目基本信息, `npm init -y`, 之后你需要修改的信息直接到`package.json`里面去修改就行了。

## webpack

* 安装webpack, 使用`npm install --save-dev webpack`。
* 编写基本的`webpack`配置文件。
* 使用`webpack`编译文件, 执行命令`webpack --config webpack/webpack.dev.config.js`。
* 进行测试。

## babel

### 介绍

* babel-core 调用Babel的API进行转码
* babel-loader
* babel-preset-es2015 用于解析 ES6
* babel-preset-react 用于解析 JSX
* babel-preset-stage-0 用于解析 ES7 提案

### 步骤

* 安装, `npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react babel-preset-stage-0`。
* 新建`babel`的配置文件：`touch .babelrc`, 然后添加配置。
* 在`webpack`配置文件里增加`babel-loader`。

## React

* 安装, `npm install --save react react-dom`。
* 测试, 修改`src/index.js`进行测试。
  ```javascript
  import React from 'react';
  import ReactDOM from 'react-dom';

  ReactDOM.render(
    <div>React Works</div>,
    doucment.getElementById('app'),
  );
  ```
* 为了使用组件，创建这两个文件夹: `cd src && mkdir containers components`。
* containters为容器组件，components为展示组件。

## 命令优化

在`package.json`里面的`scripts`里面增加命令。

```javascript
// dev-build 手动编译
// 通过--config来指定配置文件
// start 自动编译，代码变动后就会自动编译
// open 自动在浏览器里打开
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "dev-build": "webpack --config webpack/webpack.dev.config.js",
  "start": "webpack-dev-server --open --config webpack/webpack.dev.config.js"
},
```

## 配置别名

在`webpack.dev.config.js`里面添加:
  ```javascript
  resolve: {
    alias: {
      '@containers': path.resolve(__dirname, relativeRootPath, 'src/containers'),
      '@components': path.resolve(__dirname, relativeRootPath, 'src/components'),
    }
  },
  ```

## react-router

* 安装: `npm install --save react-router-dom`
* 测试:
	* 新建2个页面组件, `cd src/containers && mkdir Counter TodoList`
  * 然后创建`src/routes.js`并添加一个函数。
  * 然后在`index.js`进行配置。
  * 代码请看`examples/index.js`与`examples/routes.js`

## webpack-dev-server

直接用`index.html`里是无法路由的， 因此需要服务器，这里我们使用`webpack-dev-server`。

简单来说，`webpack-dev-server`就是一个小型的静态文件服务器。使用它，可以为webpack打包生成的资源文件提供Web服务。

安装: `npm install --save webpack-dev-server`, 最后`webpack-dev-server --config webpack/webpack.dev.config.js`

这里遇到的坑：

* 执行完上上面的命令后，仍然有报错(bundle.js not found)，怎么排查都不知道是怎么回事, 后来发现自己需要手动打包才可以找到`bundle.js`。
* 因此需要自己手动打包，`webpack --config webpack/webpack.dev.config.js`
* 此时，每次修改完代码后都需要2步, `webpack --config webpack/webpack.dev.config.js` 然后`webpack-dev-server --config webpack/webpack.dev.config.js`。
* 即先`npm run dev-build`然后`npm start`。

### 优化

显然，上面的步骤是很繁琐的，每次代码修改之后都需要先打包编译，然后启动服务器。如何做到代码更新后，就自动打包编译呢，浏览器实时更新呢?

为什么执行`webpack-dev-server --config webpack/webpack.dev.config.js`之后`bundle.js`找不到呢？查了一下相关资料才知道: 原来`webpack-dev-server`打包编译后的文件并不会生成在你的`workDir`中，而是将路径以及文件保存在内存中的，因此直接`<script src="dist/bundle.js></script>"`是会报错(404)的, 那么如何解决这个问题呢?

Look [here](https://github.com/webpack/webpack-dev-server/issues/645), 仅仅需要设置`webpack.config.js.ouput.publicPath`, 即：
```javascript
module.exports = {
  output: {
    publicPath: '/dist',
  },
};
```

### --inline与--hot


## 模块热替换

// TODO:

## redux、react-redux以及中间件

* 安装, `npm install --save redux react-redux`。
* `redux`主要提供了`createStore`用于创建store, `combineReducers`用于合成`reducers`。
* `react-redux`提供了`Provider`与`connect`这两个API, `Provider`有一个属性是store，将store存于顶层组件(Provider)里，然后在底层组件(容器组件)中使用`connect()`后就可以操作store了，其中的原理会在后面介绍。
* 具体的`react-redux`的例子可以参考[官方文档](https://github.com/reactjs/react-redux/blob/master/docs/api.md)。

so，让我们从0开始梳理搭建react spa项目的基本步骤, 从大体上来看，我将这个流程分为了下面几个步骤:

* 既然要用到`redux`，首先第一步就是创建`store`。
* 要使用`react-router`。
* 使用`react-redux`来管理`store`。

入口文件(index.js):
```javascript
import { ReactDOM } from 'react-dom';

// 用于创建store
import { createStore } from 'redux';
import reducers from './reducers';

// react-redux 顶层组件
import { Provider } from 'react-redux';

// react-router部分
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router';
import createRoutes from './routes';


const store = createStore(reducers);
const routes = createRoutes();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        {routes.map(x =>
          <Route key={x.path || Math.random()} {...x} />
        )}
      </Switch>
    </Router>
  </Provider>
);
```

入口文件用到了`reducers.js`, 我们来看一下`reducers.js`文件里是如何将所有的`reducer`函数组合在一起的呢？
```javascript
import { combineReducers } from 'redux';
import xx1 from '@containers/XX1/reducer';
import xx2 from '@containers/XX2/reducer';
import xx3 from '@containers/XX3/reducer';

export default combineReducers({
  xx1,
  xx2,
  xx3,
});
```

ok，准备工作的内容基本上已经做完了，参照我之间维护过的一个项目的目录结构，下面我们来写一些关于`redux`的代码。`cd src/containers/Counter`。
```javascript
// touch actionTypes.js
export const ADD = 'ADD';
export const MINUS = 'MINUS';

// touch actions.js
// plain actions
import * as at from './actionTypes';

export const addCounter = () => ({
  type: at.ADD,
});

export const minusCounter = () => ({
    type: at.MINUS,
});

// touch reducer.js
import * as at from './actionTypes';
const INIT_STATE = {
  count: 0,
};

export default (state = INIT_STATE, action) {
  switch (action.type) {
    case action.ADD:
      return Object.assigin({}, state, {
        count: state.count + 1,
      });
    case action.MINUS:
      return Object.assign({}, state, {
        count: state.count - 1,
      });
    default:
      return state;
  }
}
```

下面我们正式实现组件, 这里就会用到我们之前提到的`connect`函数, connect的用法可以查阅[官方文档](https://github.com/reactjs/react-redux/blob/master/docs/api.md):

```javascript
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as counterActions from './actions';

/*
 * 传入的参数是最外层的`reducers`, 即对象{ counter: counter }
 * 因此可以直接使用解构，然后state作为props返回，后面要使用counter就可以直接：this.props.counter.xxx
 *
 * 这里需要注意的是bindActionCreators这个方法, [bindActionCreators](https://github.com/reactjs/redux/blob/master/src/bindActionCreators.js)
 *
 */
const mapStateToProps = ({ counter}) => ({ counter });
const mapDispatchToProps = (dispatch) => ({
  counterActions: bindActionsCreator(counterActions, dispatch),
});

class Counter extends Component {
  constructor(props) {
    super(props);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleMinusClick = this.handleMinusClick.bind(this);
  }

  handleAddClick() {
    this.props.counterActions.addCounter();
  }

  handleMinusClick() {
    this.props.counterActions.minusCounter();
  }

  render() {
    return (
      <div>
        <button onClick={this.handleAddClick}>点击加1</button>
        <div>{this.props.counter.count}</div>
        <button onClick={this.handleMinusClick}>点击减1</button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

ok，我们`npm run dev-build && npm run start`可以在浏览器里查看我们一个简单的效果就完成了～

但是这里存在一个问题，这里的action是同步的，而通常，我们所使用的actions都是异步的，社区有很多种解决方案，这里我们使用`redux-thunk`, `redux`的一个中间件。

[redux-thunk](https://github.com/gaearon/redux-thunk)的官方文档说明的很清楚：

> Redux Thunk middleware allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. The inner function receives the store methods dispatch and getState as parameters.

也就是上面的`actions.js`里面的内容可以改写为下面的：

```javascript
export const addCounter = (cb) => dispatch => {
  setTimeout(() => {
    dispatch({
      type: at.ADD,
    });
  }, 1000);
  cb && cb();
};

export const minusCounter = (cb) => dispatch => {
  setTimeout(() => {
    dispatch({
      type: at.ADD,
    });
  }, 1000);
  cb && cb();
};
```

而修改入口文件`index.js`:
```javascript
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';

const store = createStore(
  reducers,
  applyMiddleware(thunk),
);
```

我们为了方便调试，还可以引入另一个中间件：`logger`

```javascript
import { createLogger } from 'redux-logger';

const logger = createLogger();
const store = createStore(
  reducers,
  applyMiddleware(thunk, logger),
);
```

## 使用source map

为了更容易地追踪错误和警告，`JavaScript`提供了`source map`功能，将编译后地代码映射回原始源代码。如果一个错误来自某个文件，source map就会明确地告诉你。

```javascript
module.exports = {
  entry: '',
  // 加上这一行就可以了
  devtool: 'inline-source-map',
};
```

## loader

### 加载CSS

* 安装：`npm install --save-dev style-loader css-loader`
* 在`webpack.config.js.module`里面添加代码:
```javascript
rules: [
  {
    test: /\.css$/,
    use: [
      'style-loader',
      'css-loader',
    ],
  }
]
```

### 加载图片

* 安装: `npm install --save-dev file-loader`
* 在`webpack.config.js.module`里面添加代码:
```javascript
rules: [
  {
    test: /\.(png|jpg|svg|jpeg|gif)$/,
    use: [
      'file-loader',
    ]
  },
]
```

## Plugins

// TODO

## Ajax

* 使用[开源库axios](https://github.com/axios/axios)
* 安装`npm install axios --save`

### 代理与跨域

* 跨域访问，使用CORS，服务器端配置即可。
* 代理, 配置webpack, 在`devServer`中添加`proxy`即可。
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:3000',
    // pathRewrite: {'^/api' : 'node/api'},
    changeOrigin: true,
  }
},
```

## 其他

* 如何初始化css，使用[normalize.css](https://github.com/necolas/normalize.css)， 在入口文件`index.js`里面直接`import 'normalize.css'`。
