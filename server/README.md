# 目录

<!-- vim-markdown-toc GFM -->
* [项目结构](#项目结构)
* [express](#express)
* [mongoose](#mongoose)
* [数据库设计](#数据库设计)
  * [文章表(Post)](#文章表post)
* [路由设计](#路由设计)
  * [文章](#文章)
* [使用mongoose连接mongodb](#使用mongoose连接mongodb)
* [CORS](#cors)

<!-- vim-markdown-toc -->

## 项目结构

```javascript
├── README.md
├── dist                          // 打包目录
├── script                        // 脚本
├── docs                          // 文档
├── package.json
├── src
│   ├── app                       // 模块
│   │   └── post                  // 文章模块
│   │       ├── controller.js     // 控制器
│   │       ├── routes.js         // 路由
│   │       └── schema.js         // 表结构
│   ├── common                    // 公共模块
│   │   ├── config.js             // 配置文件
│   │   ├── const.js              // 常量
│   │   └── util.js               // 常用方法
│   └── index.js                  // 入口文件
└── webpack
```

基本说明: 在`src/index.js`里面, 可以将所有模块的处理请求的`router`作为`中间件`引用起来。
```javascript
const express = require('express');
const app = express();
const post = require('./app/post/routes');

app.use(post);

app.listen(3000, () => {
  console.log('listening 3000....');
});
```

## express

* 安装，`npm install express --save`
* 使用supervisor, 在开发过程中，每次修改代码保存后，我们都需要手动重启程序，才能查看改动的效果。使用 supervisor 可以解决这个繁琐的问题。`npm install --save-dev supervisor`

## mongoose

* 这里就不介绍mongodb的安装了。
* 安装, `npm install mongoose --save`。
 * `mongod`启动mongodb服务器。
 * `mongo`客户端连接本地服务器，可以进行相应的操作。

## 数据库设计

### 文章表(Post)

|    名称    | 日期 |   内容  |  分类  |
|    name    | date | content |  sort  |
| ---------- | ---  | ------- |  ----  |
| LearnShare |  12  | 11      |  linux |
| Mike       |  32  | 22      |   js   |

## 路由设计

### 文章

```javascript
/api/post/
/api/post/create
/api/post/delete
```

## 使用mongoose连接mongodb


## CORS

* [CORS](https://medium.com/trisfera/using-cors-in-express-cac7e29b005b)
