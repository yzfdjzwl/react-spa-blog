## TODO

* 查询出来的数据，进行map遍历的时候，会将一些非枚举的数据遍历出来, 比如我的那个例子。解决办法：使用解构。
* 遍历对象的多种办法。
* 读取写入数据库的多种写法总结, 即异步循环的多种解决办法。
  * 直接使用闭包
  * Promise
  * async
  * async包
  * co, function *()
* `console.log`与`console.dir`这两者的区别。
* `title`没有在`schema`里面，导致console.log(obj)能看见title，但是console.log(obj.title);则是undefined。
* 在使用第三方库的时候，一定要注意版本，经常版本都不一样，所以导致API的使用也不一样，这里一定要注意，因此，在写代码的时候一定要多看文档，而不是熟悉API，前者的能力更重要。并且要注意，有的API是否向下兼容。

## 分页查询

http://mongoosejs.com/docs/4.x/docs/api.html (`find(conditions`)
http://mongoosejs.com/docs/api.html#query_Query-setOptions (`options`)
