

# mixin 混入

混入可以通俗理解为，两个组件**共享**同一个**相同配置**。

组件已经是在复用代码，那么`混入`可以理解为把组件间配置相同的东西，单独抽出来，放到一个地方。各组件间可以使用混入来调用该配置。

## 共享方法

示例，有如下两个组件，company组件和student组件，使用了同样的函数showName，

```vue
<template>
	<div>
		<h2 @click="showName">公司名称：{{name}}</h2>
		<h2>公司地址：{{address}}</h2>
	</div>
</template>

```

```vue
<template>
	<div>
		<h2 @click="showName">学生姓名：{{name}}</h2>
		<h2>学生地址：{{address}}</h2>
	</div>
</template>

```

那么就可以把shownName这个方法单独拿出来，写到一个单独的js里，例如这样,写到一个单独的mixin.js中：

```js
export const mixineg = {
	methods: {
		showName(){
			alert(this.name)
		}
	},
}
```

然后再每个组件中，分别引入该js。

school组件：

```js {1,11}
import {mixineg} from '../mixin'
	export default {
		name:'School',
		data() {
			return {
				name:'上海',
				address:'spdb',
				x:666
			}
		},
		 mixins:[mixineg],
	}
```

student组件：

```
import {mixineg} from '../mixin'
	export default {
		name:'student',
		data() {
			return {
				name:'张三',
				address:'上海',
				y:777
			}
		},
		 mixins:[mixineg],
	}
```





即均可正常使用showName方法。

## 共享data

如果两个组件共享一个data，那么引入混入后，data中的数据是混入与组件自己本身data的**并集**。如果混入data与组件自己data的key有相同值，优先已本身的值为准。例如，还是上面那两个组件，共享混入data，混入data如下：

```js
export const mixineg2 = {
	data() {
		return {
			x:100,
			y:200
		}
	},
}
```

那么混入后，student组件中data值为：

```js
data() {
			return {
				name:'张三',
				address:'上海',
				y:777
				x:100
			}
```

name,address值为student独有，x为混入值，y与混入值冲突，以本身值777为准。

school组件中data值为：

```js
	data() {
			return {
				name:'张三',
				address:'上海',
				y:200
				x:100
			}
```

name,address值为student独有，y为混入值，x与混入值冲突，以本身值100为准。

## 共享钩子函数

对钩子函数来说，不以任意一边为准。如果混入和组件本身都有钩子函数，则两个钩子均会执行。例如，school组件、student组件均有mounted钩子，混入中也有mounted钩子，那么这三个mounted钩子均会执行，且混入的mounted钩子先执行。

## 混入方式

### 局部混入

局部混入方式需要先引入，再定义。

```js
import {mixineg} from '../mixin'
export default {
	...
		 mixins:[mixineg],
	}
```

### 全局混入

全局混入直接在`main.js`中引入。在`main.js`中添加：

```js
...
import {mixineg,mixineg2} from './mixin'
...
Vue.mixin(mixineg)
Vue.mixin(mixineg2)
```

**全局混入会使得当前项目所有vc，vm身上都挂载上混入内容。**



