# 2017年腾讯前端实习生笔试题总结

<!-- vim-markdown-toc GFM -->
* [指针与引用的区别](#指针与引用的区别)
* [考察margin塌陷](#考察margin塌陷)
* [考察C++继承和~符号](#考察c继承和符号)
* [考察TCP通讯过程](#考察tcp通讯过程)
  * [位码](#位码)
  * [三次握手](#三次握手)
    * [为什么不是两次握手](#为什么不是两次握手)
    * [为什么不是四次握手](#为什么不是四次握手)
  * [四次挥手](#四次挥手)
    * [为什么要四次握手](#为什么要四次握手)
  * [TCP的状态](#tcp的状态)
* [考察严格模式](#考察严格模式)
* [进程/线程同步的方式](#进程线程同步的方式)
* [C++](#c)
* [计算机网络](#计算机网络)
* [HTTP2的新特性有哪些?](#http2的新特性有哪些)
* [状态码总结](#状态码总结)
  * [200与304的区别](#200与304的区别)
* [进程/线程同步](#进程线程同步)
* [考察JavaScript单线程](#考察javascript单线程)
* [考察IPV6](#考察ipv6)
* [考察协议](#考察协议)
* [考察cookie的缺点](#考察cookie的缺点)
* [考察JavaScript单线程](#考察javascript单线程-1)
* [JavaScript题目](#javascript题目)
* [考察nodejs](#考察nodejs)
* [考察UDP的首部头](#考察udp的首部头)
* [考察TCP的首部](#考察tcp的首部)
* [排序算法的时间复杂度，是否是稳定的](#排序算法的时间复杂度是否是稳定的)
* [sizeof(double)是表达式还是函数？](#sizeofdouble是表达式还是函数)
* [树](#树)
* [网站性能优化的方法有哪些？](#网站性能优化的方法有哪些)
* [从输入URL到页面加载的过程](#从输入url到页面加载的过程)
* [求任意整数有多少种解法](#求任意整数有多少种解法)
* [给定有序数组，求出数字出现的次数](#给定有序数组求出数字出现的次数)
* [声明](#声明)

<!-- vim-markdown-toc -->

## 指针与引用的区别

## 考察margin塌陷

inline-block元素是否会和其他元素在垂直方向上发生margin重叠?

当然是不会的，margin塌陷仅针对于block元素与block元素，也就是说，inline-block元素和其他元素(block元素或inline-block元素)不会发生margin塌陷。

顺便复习一下，margin塌陷有三种情况。

* 空标签，没有高度和宽度的标签，但是又设置了自己的margin-top和margin-bottom。
* 如果没有border, padding, inline content或者bfc的创建和清除将block元素的margin-top和第一个子元素的margin-top分开。或者没有border, padding, inline content, height, min-height, max-height将block元素单的margin-bottom和最后一个子元素的margin-bottom分开，那么这些margin就会发生margin collapse。折叠的边缘最终在父元素外。来源:[mdn](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing)
* 垂直方向上的相邻元素，它们的margin值不会变，但是在页面上显现出来的话，会显示更大的那一个margin。

## 考察C++继承和~符号

## 考察TCP通讯过程

主要就是三次握手，然后中间发包的过程，以及服务器是否响应，然后如何断开连接的。以及客户端和服务器端有什么状态。

### 位码

TCP的位码，有6个，当它们的值为1时它们是：

* SYN，表示建立连接
* FIN，表示关闭连接
* ACK，表示响应
* PSH，表示有DATA传输
* RST，表示连接重置
* URG，表示紧急比特

### 三次握手

seq是自己数据包本身的序号；ack是期望对方继续发送的那个数据包的序号。

[TCP三次握手信号量的含义](https://zhidao.baidu.com/question/576079521.html)

[三次握手的图](http://img1.ph.126.net/8GHLnwaz-XdxNnmuyS5KCg==/6631317354844110928.jpg)

[三次握手与四次挥手抓包图](http://img1.ph.126.net/3Exqn2HL823VPh36AanwJw==/6631209602704590166.jpg)

大写表示TCP的位码，小写表示包。

1. client发送SYN=1(表示请求建立连接), 并置发送序列号seq=x。

2. server收到后，发送SYN=1(表示请求建立连接), 并置确认序号ack=x+1, 同时告诉client自己的序列号为seq=y。

3. client收到后，告诉server端自己收到了server的确认消息并准备建立连接，于是将seq=x+1发送出去，ack=y+1发送出去。ack表示client希望接受到server发送的序列号为y+1的数据包。

#### 为什么不是两次握手

TCP作为一种可靠的传输控制协议，它的核心思想在于: 既要保证数据可靠传输，又要提高传输的效率。

因为信道是不可靠的，为了防止已失效的连接请求报文段突然又传送到了服务端，因而产生错误。

**参考：**
[为什么不是两次握手?](https://www.zhihu.com/question/24853633)

#### 为什么不是四次握手

三次握手：

“喂，你听得到吗？”

“我听得到呀，你听得到我吗？”

“我能听到你，今天balabala……”

----------------------------------------------------
两次握手：

“喂，你听得到吗？”

“我听得到呀”

“今天…………”

“……谁在说话？”

----------------------------------------------------
四次握手：

“喂，你听得到吗？”

“我听得到呀，你听得到我吗？”

“我能听到你，你能听到我吗？”

“……不想跟傻逼说话”

作者：匿名用户
链接：https://www.zhihu.com/question/24853633/answer/114872771
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

### 四次挥手

由于TCP是全双工的，所以每个方向都要单独进行关闭。

1. 关闭连接时，client向server发送FIN报文，server收到client的FIN报文通知时，仅仅代表client已经没有数据要发送给server了。但是client仍然可以接受数据。

2. 当server返回ack给client时, 表明server已经知道client没有数据要发送了。但是，server仍然可以发送数据，client仍然可以接送数据。

3. 当server发送FIN报文给client时，表明自己也没有数据要发送了。

4. client收到server发送的FIN报文，然后返回ack表明自己知道了，然后就断开连接了。

#### 为什么要四次握手

概括来说，为什么要四次挥手呢？因为TCP有个半关闭状态，如果仅仅是client发送FIN给server端，server端收到FIN返回ack确认的话，这仅仅表明client没有数据要发送了，但是仍然可以接受数据, 这叫半关闭。然后server端要发送FIN报文，表示要释放连接，然后client收到返回ack确认后，就断开连接了。

**参考**

[为什么要四次挥手](http://blog.csdn.net/daguairen/article/details/52673194)

[为什么要四次挥手2](https://zhidao.baidu.com/question/461709023.html)

[三次握手与四次挥手](http://blog.chinaunix.net/uid-26413552-id-3352210.html)

### TCP的状态

[TCP的状态转换图](http://www.cnblogs.com/qlee/archive/2011/07/12/2104089.html)
[TCP状态知识的总结](http://www.2cto.com/net/201209/157585.html)

1. client--->server, 发送SYN，seq，然后client进入SYN_SEND状态。

2. server--->client, 发送SYN，seq, ack，然后server进入到SYN_RECV状态。

3. client--->server, 发送seq，ack，此包发送完毕后，client和server都进入EATABLISHED状态。

4. 中间发送数据。

5. client--->server，发送FIN表示要申请断开请求，同时client进入FIN_WAIT_1状态。

6. server端收到client端的FIN，返回ack确认已经收到，同时server进入CLOSE_WAIT状态(因为自己有数据要发送给client，所以得等到自己想要断开连接时)。

7. client端收到server端的ack，然后进入到FIN_WAIT_2状态。

8. server端向client端发送FIN，表示请求断开连接，并进入到LAST_ACK状态(等待client的确认)。

9. client端收到server端的FIN，返回ack确认已经收到，并进入到TIME_WAIT状态(等待足够的时间以确保远程TCP接受到连接中断请求的确认	)。

10. server端收到client端的确认，进入到CLOSED状态(即没有任何连接状态)。

## 考察严格模式

[阮一峰严格模式](http://www.ruanyifeng.com/blog/2013/01/javascript_strict_mode.html)

```
var a = 5;
(function() {
	var a = b = 3;
})();
console.log(a);
console.log(b);
```
如果是上面的代码，会输出什么？

我想很多人都会知道，输出5和3。因为b前面没有var声明，会被当作全局变量声明。

```
"use strict";
var a = 5;
(function() {
	var a = b = 3;
})();
console.log(a);
console.log(b);
```

那么，如果在严格模式下会怎么办呢？

会在var a = b = 3;抛出未捕获的异常。<code>b is not defined</code>, 即全局变量必须显示声明。


## 进程/线程同步的方式

## C++ 

```
short result = 2017;
result = result << 5;
result = result >> 5;
cout<<result;
```

## 计算机网络

交换机属于哪一层?

补充：

1. 物理层：网线，集线器

2. 数据链路层：网卡，交换机

3. 网络层：路由器

4. 运输层

5. 应用层

## HTTP2的新特性有哪些?

1. 基于二进制的协议

2. 连接的多路复用, 这意味着，一个TCP连接，可以请求多个资源

3. 流的优先级

4. 服务器推送(服务器主动推送)

5. 重置流

**参考:**

[来源知乎](https://zhuanlan.zhihu.com/p/19969498?columnSlug=ye11ow)

## 状态码总结

[来源](https://zh.wikipedia.org/wiki/HTTP%E7%8A%B6%E6%80%81%E7%A0%81), 需要翻墙。

1. 1XX, 表示消息
2. 2XX, 表示成功
3. 3XX, 表示重定向
4. 4XX，表示客户端错误
5. 5XX，表示服务器错误

**常见的状态码:**

* 100, client应该继续发送请求，即继续。
* 101, server通知client修改协议，也就说，client需要采用新的协议版本去访问server。
* 200, 请求已成功。
* 200 ～ 207
* 300 Multiple Choices 如果请求一个指向多个资源的URL时，会返回这个状态码，比如某个服务器上有某个HTML文件的中文和英文版本。
* 301永久重定向
* 302临时重定向，HTTP1.0的状态码。
	1. client向server发送post请求。
	2. server返回URL和302。
	3. 等待用户确认。
	4. 用户确认后，client使用post访问URL。
* 303临时重定向，HTTP1.1的状态码
	1. client向server发送非get、head请求。
	2. server返回URL和303。
	3. client使用get访问URL。
* 307临时重定向，HTTP1.1的状态码
	1. client向server发送非get、head请求。
	2. server返回URL和307。
	3. 等待用户确认。
	4. 用户确认后，post访问URL, 并不会重定向为get方法访问URL。
* 300 ～ 307
* 400 ～ 418
* 421 ～ 426
* 449， 451
* 400, Bad Request, 语法错误，服务器无法理解。
* 401, Unauthorized, 未被授权。登录失败，此错误表明传输给服务器的证书与登录服务器所需的证书不匹配。 
* 402, 预留的
* 403, Forbidden, 服务器已经能够理解，但是进制执行它, 一般来说是，客户端权限不够。
* 404, NOT FOUND
* 405, Method Not Allowed, 请求行中指定的请求方法不能用于请求相应的资源。
* 406, Not Acceptable, 请求的资源的内容特性无法满足请求头中的条件，因此无法生成响应实体。
* 500 ～ 510
* 500, Internal Server Error, 服务器遇到了一个未曾预料的状况，导致了不能进一步的处理，一般来说，这个错误出现在程序代码出问题时。
* 501, Not Implemented, 服务器不支持当前请求所需要的某个功能, 可能是服务器无法识别请求的方法。
* 502, Bad Gateway, 作为网关或代理工作的服务器尝试执行请求时，从上游服务器接受到无效的响应。
* 503, Service Unavailable, 由于临时的服务器维护或过载，服务器无法处理请求。
* 504, Gateway Timeout, 作为网关或代理工作的服务器尝试请求时，未能及时从上游服务器或者辅助服务器收到响应。
* 505, HTTP Version Not Supported, 服务器不支持，或者拒绝支持在请求中使用的HTTP版本。
	
### 200与304的区别

* 第一次请求成功，是200。刷新后，也是200，表示从浏览器缓存里面得到的。不会向服务器发送请求。
* 304的话，是强制刷新请求，要向服务器发送请求，如果服务器发现和本地文件是一样时，就会返回304状态码，并且不会发送文件，依然是从浏览器缓存里获取的。

## 进程/线程同步

* 硬件方式
* 信号量
* 管程

## 考察JavaScript单线程

```
window.setTimeout(function() {
	console.log(1);
}, 1);
window.setTimeout(function() {
	console.log(2);
}, 2);
window.setTimeout(function() {
	console.log(3);
}, 3);
window.requestAnimationFrame(function() {
	console.log(4);
});
```

上面代码执行情况可能有哪几种?

先说说答案吧，一共有四种情况，分别是：

* 4123
* 1423
* 1243
* 1234

为什么是这四种情况呢，setTimeout表示的是隔了多少时间后，就将函数添加到事件处理后面，但是并不代表马上就要执行。但是为什么是这样，我也不清楚，因为。。。

## 考察IPV6

## 考察协议

* DNS
* FTP
* TLS
* POP3
* HTTP2

## 考察cookie的缺点

请问：即使使用HTTPS，那么cookie是明文还是加密的?

XSS攻击?

## 考察JavaScript单线程

```
var a = 1;
setTimeout(function() {
	console.log(a);
}, 0);
var date1 = new Date();
while(new Date().getTime() - date1.getTime() <= 10) {
	console.log(a);
}
a = 2;
```

这道题，也是考察JavaScript的单线程，setTimeout的参数即使是0，表示0毫秒过后，将这个事件添加到队列里去，但是它依然要等待其他JavaScript代码处理结束后，才会执行队列里的代码。因此它的执行结果是：

* n个1
* 2

## JavaScript题目

```
var x = 1;
function a() {
	alert(x);
	var x = 2;
	x++;
	alert(x);
}

function b() {
	alert(x);
	x++;
	alert(x);
}

if(0 < 100 < 0) {
	a();
} else {
	b();
}

if(0 < 100 < (0 + 4)) {
	a();
} else {
	b();
}
```

经过测试，发现这道题，考察的是if语句数据类型的转换。它的实际过程是这么回事:

1. 0小于100返回true，true再次被比较时回被转为1。
2. true 小于 0 返回false，所以第一个if语句将会执行函数b里的代码。
3. 会依次弹出1, 2。
4. 第二个if 0 小于 100会返回true，true会被转为1。
5. true 小于 4返回true，所以第二个if将会执行函数a里的代码。
6. 会依次弹出undefined, 3。

```
// 即
1 2 undefined 3
```

## 考察nodejs

## 考察UDP的首部头

[UDP首部与伪首部](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491379594189&di=5a29a9a96cca491bf0bb0fdf573fbb17&imgtype=0&src=http%3A%2F%2Fimage8.360doc.com%2FDownloadImg%2F2010%2F04%2F1316%2F2854819_7.jpg)

UDP的首部由8个字节组成。

* 源端口：2个字节。
* 目的端口：2个字节。
* 长度：2个字节。
* 检验和：2个字节。

## 考察TCP的首部

[TCP首部字段](http://blog.chinaunix.net/attachment/201211/14/26413668_13528760002w4J.jpg)

一个TCP报文由TCP首部和数据组成的。TCP报文首部的前20个字节是固定的，后面有4n个字节是根据需要而增加的, 因此TCP首部的最小长度是20字节。

20个字节由以下部分组成：

* 源端口：2个字节
* 目的端口：2个字节 
* 序号：4个字节, 因为TCP是面向字节流的，在一个TCP连接中传送的字节流中的每一个字节都按顺序编号。
* 确认号：4个字节，是期望收到下一个报文段的第一个数据字节的序号。
* 数据偏移：占4位，它指出TCP报文段的数据起始处距离TCP报文段的起始处有多远。
* 保留：占6位。
* 6个状态位：占6位，URG，ACK，PSH，RST，SYN，FIN。
* 窗口：占2个字节，指的是接受窗口的大小。
* 检验和：占2个字节。
* 紧急指针：占2个字节，只有URG=1时才有意义。
* 选项和填充：一共占4个字节，选项大小可变。


## 排序算法的时间复杂度，是否是稳定的

什么是稳定的？稳定其实指的是如果两个数大小一样，当经过排序后，它们的顺序依然没有改变，那么排序就是稳定的。

[常见排序算法是否稳定](http://blog.chinaunix.net/attachment/201201/18/21457204_1326898064RUxx.jpg)

* 冒泡排序，n的平方，稳定
* 插入排序，n的平方，稳定
* 归并排序，n的log2n，稳定
* 基数排序，d(r+n), 稳定, r代表关键字的基数，d代表长度，n代表关键字的个数。
* 快速排序，n的log2n, 不稳定
* 希尔排序，n的1.3次方，不稳定
* 选择排序，n的平方，不稳定
* 堆排序，n的log2n, 不稳定

## sizeof(double)是表达式还是函数？

sizeof不是函数，它是编译时处理的，函数只能在运行时求值。

## 树

描述：有一棵树，它的度是4。度为4的节点个数是1，度为3的节点个数是2，度为2的节点个数是3，度为1的节点个数是4，问总节点的个数和节点为0的个数是多少。

所谓度就是节点子树的个数，即分支数目，我画出来是21个节点，度为0的个数是11。

## 网站性能优化的方法有哪些？

参见雅虎军规。

## 从输入URL到页面加载的过程

参见google。

## 求任意整数有多少种解法

```
2 = 1 + 1
3 = 1 + 2
4 = 1+ 3；4 = 2 + 2；
```

## 给定有序数组，求出数字出现的次数

可以自己设置一个hashTable

## 声明

<p style="color: red;">
如果您发现文中有错误，请进快联系我。
如果您觉得本文对您有帮助，请帮忙点一下推荐，谢谢您。
</p>
