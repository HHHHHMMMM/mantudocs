# ref属性

ref属性有着跟标签上的`id`属性差不多的作用。但有着细微的差别。在vue中，通常通过`$ref`来获取元素，而不是手动通过`document.getElementById()`的方式。

例如下例，

```html
<template>
	<div>
		<h1 v-text="msg" ref="title"></h1>
		<button ref="btn" @click="showDOM">点我输出上方的DOM元素</button>
		<School ref="sch"/>
	</div>
</template>

<script>
	//引入School组件
	import School from './components/School'
	export default {
		name:'App',
		components:{School},
		data() {
			return {
				msg:'欢迎学习Vue！'
			}
		},
		methods: {
			showDOM(){
                //真实DOM元素
				console.log(this.$refs.title) 
                //真实DOM元素
				console.log(this.$refs.btn) 
                //School组件的实例对象（vc）
				console.log(this.$refs.sch) 
			}
		},
	}
</script>

```

#### 给html原生标签添加ref属性

分别给两个html原生标签 h1、button来添加`ref`属性，则在vue中可以通过`this.$ref.xxx`来获取到对应的dom元素。

#### 给vue组件添加ref属性

给vue组件添加ref属性，则`this.$ref.xxx`获得到的是**该组件的组件实例对象（vc）**.

唠叨一句，这里的`this`指的是谁？很明显，由vc管理的methods，其this就是指向vc本身。本例的vc就是App组件实例对象。那么上面拿到的vc是谁？School组件实例对象，请一定不要搞混掉。

::: tip

`ref`属性和`id`属性有什么不同？

1. 在普通dom元素上面，使用ref或id，取到dom元素的取法不一样。使用ref，则使用`this.$ref.xxxx`；使用id，则使用`document.getElementById`。但最终取到的值dom元素是一样的。
2. 在vue组件上使用ref或id，除了取dom元素方法不一样，取到的结果也不一样。使用`this.$ref.xxx`取到的是xxx组件的组件实例对象（vc），而id取到的则是该组件对应的html结构。

:::