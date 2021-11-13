## Vue模板语法

1. 插值语法：

   功能：用于解析**标签体**内容。
   写法：{{xxx}}，xxx是js表达式，且可以直接读取到data中的所有属性。

   例如下例中"{xxx.name}}"，会到vue实例中寻找bank.name属性值，并将其属性值spdb显示在页面上。

2. 指令语法：

   功能：用于解析**标签**（包括：标签属性、标签体内容、绑定事件.....）。
   举例：v-bind:href="xxx" 或  简写为 :href="xxx"，xxx同样要写js表达式，且可以直接读取到data中的所有属性。

   备注：Vue中有很多的指令，且形式都是：v-????，此处我们只是拿v-bind举个例子。

   ```vue
   <a v-bind:href="bank.url.toUpperCase()" >点我去{{bank.name}}学习1</a>
   <!--简写形式-->
   <a :href="bank.url">点我去{{bank.name}}学习1</a>
   <a :href="Date.now()">时间属性</a>
   ...
   	const vm=new Vue({
   			...
   			data:{
   				name:'plbs',
   				bank:{
   					name:'spdb',
   					url:'https://spdb.com.cn',
   				}
   			},
   		...
   		})
   ```

   ::: tip

   当属性用v-bind修饰的时候，属性后面引号包起来的值，应当被当做js表达式来解析。

   :::

   例如此例中，"spdb.url.toUpperCase()"，会被vue解析，去data中找对应的值：https://spdb.com.cn，并最终将https://spdb.com.cn显示在页面上。

   Date.now（）也会被vue解析成js表达式，因此时间属性a标签属性，会显示成时间戳。

