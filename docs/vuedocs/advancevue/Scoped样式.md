# Scoped样式

在vue中，各个组件中编写的style样式，最终都会被汇总到一起。这就有一个问题，就是如何处理两个组件中重名的样式。

比如A组件一个样式

```less
<style >
.demo{
		background-color: pink;
		.spdb{
			font-size: 40px;
		}
	}
</style>
```

B组件也有一个样式：

```css
<style >
.demo{
		background-color: skyblue;
	}
</style>
```

这样就会有冲突，最终`background-color`以**最后引入的那个组件的样式为准。**

如何解决？

使用`scoped`标签即可。

在style中加入`scoped`，如下：

```css {1}
<style scoped>
	.demo{
		background-color: skyblue;
	}
</style>
```

```less {1}
<style lang="less" scoped>
	.demo{
		background-color: pink;
		.spdb{
			font-size: 40px;
		}
	}
</style>
```

