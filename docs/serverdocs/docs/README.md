# vue基础

## 初识vue

我们可以把vue理解为一个渐进式的js框架。那么针对前端来说，vue功能就是更加方便的操作dom元素。

vue主体代码架构请参考[vue官网]([Vue.js (vuejs.org)](https://cn.vuejs.org/))

但请注意:

1. 想让Vue工作，就必须创建一个Vue实例，且要传入一个配置对象；

2. 容器里的代码依然符合html规范，只不过混入了一些特殊的Vue语法；

3. 容器里的代码被称为【Vue模板】；

4. Vue实例和容器是一一对应的；

5. 真实开发中只有一个Vue实例，并且会配合着组件一起使用

6. {{xxx}}中的xxx要写js表达式，且xxx可以自动读取到data中的所有属性；

7. 一旦data中的数据发生改变，那么页面中用到该数据的地方也会自动更新；

   ::: tip

   注意区分:js表达式 和 js代码(语句)

   1.表达式：一个表达式会产生一个值，可以放在任何一个需要值的地方：

   ​					(1). a

   ​					(2). a+b

   ​					(3). demo(1)

   ​					(4). x === y ? 'a' : 'b'

   2.js代码(语句)

   ​			        (1)if(){}

   ​					2)for(){}

   :::

附：最简单的vue代码

```vue
<!DOCTYPE html>
<html>
   <head>
      <meta charset="UTF-8" />
      <title>初识Vue</title>
      <!-- 引入Vue -->
      <script type="text/javascript" src="../js/vue.js"></script>
   </head>
   <body>
      <!-- 准备好一个容器 -->
      <div id="demo">
         <h1>Hello，{{name.toUpperCase()}}，{{address}}</h1>
      </div>

      <script type="text/javascript" >
          //阻止 vue 在启动时生成生产提示。
         Vue.config.productionTip = false 

         //创建Vue实例
         new Vue({
             //el用于指定当前Vue实例为哪个容器服务，值通常为css选择器字符串。
            el:'#demo', 
             //data中用于存储数据，数据供el所指定的容器去使用，值我们暂时先写成一个对象。
            data:{ 
               name:'spdb',
               address:'shanghai'
            }
         })

      </script>
   </body>
</html>
```

