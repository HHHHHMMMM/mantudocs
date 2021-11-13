# vue检测数据改变的原理

## vue响应式

在讲原理之前，先请大家搞明白一个问题，什么是响应式？

> 响应式就是，当一修改data数据，视图会进行更新，重新解析模板并将数据正确显示。

那为什么vue可以检测到data数据的改变呢？

## 重温vue数据代理

我们前面在谈论数据代理的时候，曾经说过，

> vue通过Object.defineProperty()把data对象中所有属性添加到vm上，为每一个添加到vm上的属性，都指定一个getter/setter，在getter/setter内部去操作（读/写）data中对应的属性，而且vm._data=data。

恰恰是因为数据代理的setter方法，每次修改属性的时候，vue就会收到数据改变的通知。

## vue数据监视原理及做响应式的流程

### vue对象数据监视原理

Vue 的响应式原理是核心是通过 ES6 的保护对象的 Object.defindeProperty 中的访问器属性中的 get 和 set 方法，data 中声明的属性都被添加了访问器属性，当读取 data 中的数据时自动调用 get 方法，当修改 data 中的数据时，自动调用 set 方法，检测到数据的变化，会通知观察者 Wacher，观察者 Wacher自动触发重新render 当前组件（子组件不会重新渲染）,生成新的虚拟 DOM 树，Vue 框架会遍历并对比新虚拟 DOM 树和旧虚拟 DOM 树中每个节点的差别，并记录下来，最后，加载操作，将所有记录的不同点，局部修改到真实 DOM 树上。

### vue响应式流程

通俗点讲，vue从拿到data数据，到把data中数据内容显示到页面上，一共做了6步：

1. **数据劫持**：把data中的数据进行了对应的处理，使其中每个属性通过 Object.defindeProperty方法，加上getter，setter方法。
2. 把data赋值给vm._data,此时vm身上就有了data的数据，且更新data会调用setter方法，vue从而得知数据被修改；
3. setter方法里还进行了模板重新解析的调用，从而使模板重新解析
4. 模板重新解析之后会引起生成新虚拟dom
5. 新旧虚拟dom进行比对
6. 更新页面

## vue监视对象数据

截至目前，我们可以大概的说出vue底层是如何实现对象数据监测的。官网的一张图很好的说明了整个流程。

![image-20211018215423717](/img/image-20211018215423717.png)

我们接下来模拟一下实现逻辑：

``` js
	let data = {
				name:'spdb',
				address:'上海',
			}

			//创建一个监视的实例对象，用于监视data中属性的变化
			const obs = new Observer(data)		

			//准备一个vm实例对象
			let vm = {}
			vm._data = data = obs

			function Observer(obj){
				//汇总对象中所有的属性形成一个数组
				const keys = Object.keys(obj)
				//遍历
				keys.forEach((k)=>{
					Object.defineProperty(this,k,{
						get(){
							return obj[k]
						},
						set(val){
							console.log(`${k}被改了，我要去解析模板，生成虚拟DOM.....我要开始忙了`)
							obj[k] = val
						}
					})
				})
			}
```

1. 我们先创建一个data对象，里面有两个属性，name和address-->`模拟vue中的data`

2. 再创建一个监视的实例对象Observer，传入参数data，用于监视data中属性的变化。-->`模拟watch监视过程`

3. Observer拿到传入的data对象的所有属性数组，遍历，get方法将key对应的value返回出去，set方法则将新val赋值给对应的key,并最终返回一个obs对象**-->`模拟数据劫持，将data转化为obs`

4. 最后创建一个vm对象，将obs赋值给data，同时赋值给vm._data-->模拟 `  vm._data = data = obs`

   至此，我们模拟了一个简单的vue数据对象监测。但vue数据检测代码远没有这么简单，有兴趣的老师可以自行研究一下源码。

## vue.set() 的使用

上面我们知道了，写在data里面的数据，vue会做数据劫持，然后做数据代理，由此成为响应式数据。那么除了写死在data中，还有没有办法后期给对象做响应式数据呢？

有的。这就是vue.set() api，可以通过这个api，给vue中已知对象添加任意响应式属性。

使用方法为：

`vue.set(<target>,<key>,<value>)`

或

`vm.$set(<target>,<key>,<value>)`

具体使用案例如下，例如要给student对象添加一个默认值为男的sex属性：

```html
<div id="root">
   <h1>学生信息</h1>
   <button @click="addSex">添加一个性别属性，默认值是男</button>
</div>
```

```js {18}
const vm = new Vue({
   el:'#root',
   data:{
      student:{
         name:'tom',
         age:{
            rAge:40,
            sAge:29,
         },
         friends:[
            {name:'jerry',age:35},
            {name:'tony',age:36}
         ]
      }
   },
   methods: {
      addSex(){
         Vue.set(this.student,'sex','男')
          //或如下，这里的this值得是vm
         this.$set(this.student,'sex','男')
      }
   }
})
```

## vue监视数组数据

vue监视数组数据，只有通过修改