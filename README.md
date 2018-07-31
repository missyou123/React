# React
React基础Demo/webpack4环境搭建
一.webpack4环境搭建

1.使用 cnpm 安装 webpack ，运行cnpm i webpack webpack-cli -D

- 如何安装 cnpm: 全局运行 npm i cnpm -g

2.注意：webpack 4.x 提供了 约定大于配置的概念；目的是为了尽量减少 配置文件的体积；

- 默认约定了：
- 打包的入口是src -> index.js
- 打包的输出文件是dist -> main.js
- 4.x 中 新增了 mode 选项(为必选项)，可选的值为：development 和 production;

3.使用 cnpm 安装 webpack-dev-server , 运行 cnpm i webpack-dev-server -D

- 在项目package.json文件中配置 
        "scripts": {
          "test": "echo \"Error: no test specified\" && exit 1",
          "dev": "webpack-dev-server --open"
        },

4.使用 cnpm 安装 html-webpack-plugin , 运行 cnpm i html-webpack-plugin -D

- 在内存中自动生成 index 页面的插件
      const path = require('path')
      const HtmlWebPackPlugin = require('html-webpack-plugin') // 导入 在内存中自动生成 index 页面的插件
      
      // 创建一个插件的实例对象
      const htmlPlugin = new HtmlWebPackPlugin({
        template: path.join(__dirname, './src/index.html'), // 源文件
        filename: 'index.html' // 生成的内存中首页的名称
      })
      
      
      module.exports = {
        mode: 'development', // development   production
        plugins: [
          htmlPlugin
        ],
      }





二.React的核心概念介绍

虚拟DOM

- 虚拟DOM：是框架中的概念；而是开发框架的程序员，手动用JS对象来模拟DOM元素和嵌套关系；
- 本质： 用JS对象，来模拟DOM元素和嵌套关系；
- 目的：就是为了实现页面元素的高效更新；



Diff算法

- tree diff:新旧两棵DOM树，逐层对比的过程，就是 Tree Diff； 当整颗DOM逐层对比完毕，则所有需要被按需更新的元素，必然能够找到；
- component diff：在进行Tree Diff的时候，每一层中，组件级别的对比，叫做 Component Diff；
  - 如果对比前后，组件的类型相同，则暂时认为此组件不需要被更新；
  - 如果对比前后，组件类型不同，则需要移除旧组件，创建新组件，并追加到页面上；
- element diff:在进行组件对比的时候，如果两个组件类型相同，则需要进行 元素级别的对比，这叫做 Element Diff；
  

1. 在项目中使用 react

1. 运行 cnpm i react react-dom -S 安装包
   - react： 专门用于创建组件和虚拟DOM的，同时组件的生命周期都在这个包中
   - react-dom： 专门进行DOM操作的，最主要的应用场景，就是ReactDOM.render()
2. 在index.html页面中，创建容器：
       <!-- 容器，将来，使用 React 创建的虚拟DOM元素，都会被渲染到这个指定的容器中 -->
       <div id="app"></div>
3. 导入 包：
       import React from 'react'
       import ReactDOM from 'react-dom'
4. 创建虚拟DOM元素：
       function Test(){
           retrun <h1></h1>
       }

   5.渲染：

    // 3. 渲染虚拟DOM元素
    // 参数1： 表示要渲染的虚拟DOM对象
    // 参数2： 指定容器,注意：这里不能直接放 容器元素的Id字符串，需要放一个容器的DOM对象
    ReactDOM.render(<Test/>, document.getElementById('app'))



2.JSX语法

- JSX语法：就是符合 xml 规范的 JS 语法

1. 如何启用 jsx 语法？
   - 安装 babel 插件
     - 运行cnpm i babel-core babel-loader babel-plugin-transform-runtime -D
     - 运行cnpm i babel-preset-env babel-preset-stage-0 -D
   - 安装能够识别转换jsx语法的包 babel-preset-react 
     - 运行cnpm i babel-preset-react -D
   - 添加 .babelrc 配置文件
         {
           "presets": ["env", "stage-0", "react"],
           "plugins": ["transform-runtime"]
         }
   - 添加babel-loader配置项：
         module: { //要打包的第三方模块
             rules: [
               { test: /\.js|jsx$/, use: 'babel-loader', exclude: /node_modules/ }
             ]
         }
     
2. jsx 语法的本质：并不是直接把 jsx 渲染到页面上，而是 内部先转换成了 createElement 形式，再渲染的；
3. 在 jsx 中混合写入 js 表达式：在 jsx 语法中，要把 JS代码写到 { } 中
   - 渲染数字
   - 渲染字符串
   - 渲染布尔值
   - 为属性绑定值
   - 渲染jsx元素
   - 渲染jsx元素数组
   - 将普通字符串数组，转为jsx数组并渲染到页面上【两种方案】
4. 在 jsx 中 写注释：推荐使用{ /* 这是注释 */ }
5. 为 jsx 中的元素添加class类名：需要使用className 来替代 class；htmlFor替换label的for属性
6. 在JSX创建DOM的时候，所有的节点，必须有唯一的根元素进行包裹；
7. 在 jsx 语法中，标签必须 成对出现，如果是单标签，则必须自闭和！

当 编译引擎，在编译JSX代码的时候，如果遇到了<那么就把它当作 HTML代码去编译，如果遇到了 {} 就把 花括号内部的代码当作 普通JS代码去编译；



3.创建组件的两种方式

1.使用构造函数来创建组件，如果要接收外界传递的数据，需要在 构造函数的参数列表中使用props来接收；

必须要向外return一个合法的JSX创建的虚拟DOM；

- 创建组件：
      function Hello (props) { 
      	// return null 
      	return <div>Hello 组件 + {props.name}</div>
      }

2.使用 class 关键字来创建组件

    class 组件名称 extends React.Component {
        render(){
            return <div>这是 class 创建的组件</div>
        }
    }
























