/*
 * 思路:
 * 遍历blog/下的每个目录
 * 对于每个目录的每个*.md文件都进行读取
 * 然后写入数据库
 * {
 *  linux: [],
 *  js: [],
 * }
 *
 */

/*
 * counter用于解决的问题是判断是否结束
 *
 * 闭包所解决的问题是将i能够正确传入
 *
 *
 */

const firstline = require('firstline');
const fs = require('fs');
const path = require('path');
const staticDir =  `${__dirname}/blog/`;
let obj = {};
let counter = 0;

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/blog';

const readAllFiles = (callback) => {
  fs.readdir(staticDir, (error, dirs) => {
    // 填充对象
    let dirCounter = dirs.length;

    for (let k = 0; k < dirs.length; k++) {
      if (!obj[dirs[k]]) {
        obj[dirs[k]] = [];
      }
    }
    for (let i = 0; i < dirs.length; i++) {
      (function(i) {
        const pathname = `${staticDir}${dirs[i]}/`;
        fs.readdir(pathname, (error, files) => {
          let fileCounter = files.length;
          for (let j = 0; j < files.length; j++) {
            (function(j) {
              const file = `${pathname}${files[j]}`;
              var stat = fs.lstatSync(file);
              if (stat.isDirectory()) {
                fileCounter = fileCounter - 1;
              }
              if (stat.isFile()) {

                fs.readFile(file, 'utf8', (error, content) => {
                  firstline(file).then(firstLine => {
                    // 读取文件第一行
                    const title = firstLine.split(' ')[1];
                    fileCounter = fileCounter - 1;

                    obj[dirs[i]].push({
                      // 去除md后缀
                      url: files[j].split('.')[0],
                      content,
                      title,
                    });
                    if (fileCounter === 0) {
                      dirCounter = dirCounter - 1;
                    }
                    if (fileCounter === 0 && dirCounter === 0) {
                      // 跳出循环
                      callback && callback(obj);
                    }
                  });
                });
              }
            })(j);
          }
        });
      })(i);
    }
  });
};

readAllFiles((obj) => {
  MongoClient.connect(url, (err, db) => {
    if (err) {
      return;
    }
    console.log('Connectted successfully to server');

    writePosts(obj, db, () => {
      console.log('All Datas write successfully');
    });
  });
});

const writePosts = (obj, db, callback) => {
  // keys是分类
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    (function(i) {
      const sort = keys[i];
      for (let j = 0; j < obj[sort].length; j++) {
        (function(j) {
          const post = Object.assign({}, obj[sort][j], {
            sort,
          });
          db.collection('posts').insertOne(post, (err, r) => {
          });
        })(j);
      }
    })(i);
  }
};
