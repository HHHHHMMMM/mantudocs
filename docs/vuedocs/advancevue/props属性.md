# props属性

props属性用来动态传入组件中所需要的属性值。

组件复用时，经常需要动态指定某组件中所需属性值。例如，有一个person组件，A使用时，希望person组件的属性name=“A”,age="18"，而B使用时，则希望person组件的属性name=“B”,age="19"。那么就可以使用props属性。

## 使用流程

组件提供方声明所需props，组件使用方直接在使用时传入对应props即可。

## 组件提供方props属性声明

组件提供方需要显式声明props。声明方法有如下三种：

### 简单声明接收

```js
props:['属性1','属性2','属性3'] 
```

### 复杂声明接收（对类型进行限制）

```js
	props:{
			属性1:类型1,
			属性2:类型2,
		}
```

### 复杂声明接收（对类型及默认值进行限制）

```js
	props:{
			属性1:{
				type:类型1, 
				//是否必输
				required:true, 
			},
			属性2:{
				type:类型2,
				//默认值
				default:99 
			},
		}
```

## 组件使用方传入props

组件使用方使用方法：直接传入对应属性即可。

```html
<template>
	<div>
		<组件名称 属性1="value1" 属性2="value2" />
	</div>
</template>
```

::: tip

vue一般不建议更改外部传到组件中的属性值，可能会导致各种各样的问题。如果就是有业务需求需要改怎么办？很简单，声明一个中间属性来过渡。以name属性为例，可以声明一个myname属性，且myname=this.name,这样就可以对myname属性进行想要的修改了。

:::

## 使用示例代码

#### 组件提供方代码

```vue
<template>
	<div>
		<h1>{{msg}}</h1>
		<h2>员工姓名：{{name}}</h2>
		<h2>员工性别：{{sex}}</h2>
		<h2>员工年龄：{{myAge+1}}</h2>
		<button @click="updateAge">尝试修改收到的年龄</button>
	</div>
</template>

<script>
	export default {
		name:'Student',
		data() {
			console.log(this)
			return {
				msg:'我是一个的员工',
				myAge:this.age
			}
		},
		methods: {
			updateAge(){
				this.myAge++
			}
		},
		//简单声明接收
		// props:['name','age','sex'] 

		//接收的同时对数据进行类型限制
		/* props:{
			name:String,
			age:Number,
			sex:String
		} */

		//接收的同时对数据：进行类型限制+默认值的指定+必要性的限制
		props:{
			name:{
				type:String, //name的类型是字符串
				required:true, //name是必要的
			},
			age:{
				type:Number,
				default:99 //默认值
			},
			sex:{
				type:String,
				required:true
			}
		}
	}
</script>
```

#### 组件使用方代码

```vue
<template>
	<div>
		<Student name="李四" sex="女" :age="18"/>
	</div>
</template>
```

::: tip

有个细节，传入的age为什么要加":"?

在vue中，`:属性`后面跟的是js表达式。这里的"18"被当成js表达式计算，计算结果就是18，是数字类型。而如果不加冒号，后面会被当做一个字符类型的18，传到组件提供方后如果对该值+1，则得到的是"181"，而不是19。

:::





