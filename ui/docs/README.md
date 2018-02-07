## React bind

* `class`内部的函数，this不会自绑定, 因此需要手动bind。
* 箭头函数没有this，因此在箭头函数里面使用this，this是外部作用域的this。
* `this.print = this.print.bind(this);`表示的是:
  * 在`constructor`里面，是可以访问到`this`的，也就是说，最后一个this指向的是该组件。
  * `this.print.bind(this)`最后会返回一个新的函数，而这个新的函数的this指向的是该组件。
  * `this.print = this.print.bind(this)`表示，为`this.print`重新赋值，`this.print`引用的就是返回的那个新的函数，可以自己画一个图更好理解一点儿。
* 因此，一般有两种写法，手动bind以及箭头函数。
* 可以看[react-es6-autobinding-and-createclass/](https://blog.andrewray.me/react-es6-autobinding-and-createclass/)。

## 文章TODO

* 踩坑: http://www.cnblogs.com/lijie33402/p/6421331.html
    * 解决的两种办法: 使用解构、单独一个变量
* react只有当state更新后，要地址发生变化
* 如何处理输入地址的时候仍然可以跳到相应的页面(文章列表页)
* 如何每次点击下一页的时候回到最上面，因为是单页面应用，也就是说不会自动刷新。


看不到你处理TOGGLE_TOPNAV的reducer是怎么写的，我猜测应该是因为你直接对state进行了修改，state是引用，store内部的state同样也就变了，这样导致React-Redux认为dispatch前后state没有改变，就不会重新渲染UI，实际state已经改变。
当处理TOGGLE_TOPNAV的时候触发了state变动，所有的数据被渲染，所以UI就变化了。

解决办法不要直接修改state 不要直接修改state 不要直接修改state

## 功能TODO

* 主页
* 分类
  * linux
  * javascript
  * css
* 归档
  * 按时间来
* 我的项目
* 关于我
    * 可能是一个单独的页面
* 详情页
