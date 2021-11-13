# vue中的属性和方法

## vue中的属性

vue中的属性指的是vm实例的data对象里面的key。

如下例中，data对象中所有的key，都称为vue中的属性。下例中firstName，lastName，x均为属性。

```js
		data:{
				firstName:'张',
				lastName:'三',
				x:'你好'
			},
```

模板中使用示例：

```html
<div id="root">
   姓：<input type="text" v-model="firstName"> <br/><br/>
   名：<input type="text" v-model="lastName"> <br/><br/>
    x: <input type="text" v-model="x"> <br/><br/>
</div>
```

## vue中的方法

vue中的方法一般单独单列在methods对象中。

```js
methods: {
   fullName(){
      return this.firstName + '-' + this.lastName
   }
},
```

使用方法：

```html
<div id="root">
   全名：<span>{{fullName()}}</span>
</div>
```

::: tip

vue中的属性和方法，都会出现在vm身上。区别就是，属性是通过数据代理的方式计算得来，而方法则是写什么就是什么。

:::

如图所示：

![image-20211016213209012](/img/image-20211016213209012.png)

firstName、lastName、fullName均进行了显示。

但firstName 和lastName是属性，显示为数据代理形式，而fullname是函数，显示为函数形式。