# React
- 注 ; 项目运行前请先运行 cnpm install 安装所有依赖项



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

3.两种创建组件方式的对比

1. 用构造函数创建出来的组件：叫做“无状态组件”
2. 用class关键字创建出来的组件：叫做“有状态组件”

有状态组件和无状态组件之间的本质区别就是：有无state属性！

4.组件中的 props 和 state/data 之间的区别

- props 中的数据都是外界传递过来的；
- state/data 中的数据，都是组件私有的；（通过 Ajax 获取回来的数据，一般都是私有数据）；
- props  中的数据都是只读的；不能重新赋值；
- state/data 中的数据，都是可读可写的；







4.设置样式

1. 使用普通的 style 样式
       <h1 style={ {color: 'red', fontWeight: 200} }></h1>
2. 启用 css-modules
   1. 修改 webpack.config.js这个配置文件，为 css-loader 添加参数：
          { test: /\.css$/, use: ['style-loader', 'css-loader?modules'] } // 为 .css 后缀名的样式表  启用 CSS 模块化
   2. 在需要的组件中，import导入样式表，并接收模块化的 CSS 样式对象：
          import cssObj from '../css/CmtList.css' 
   3. 在需要的HTML标签上，使用className指定模块化的样式：
       
3. 使用localIdentName自定义生成的类名格式，可选的参数有：
   - [path]  表示样式表 相对于项目根目录 所在路径
   - [name]  表示 样式表文件名称
   - [local]  表示样式的类名定义名称
   - [hash:length]  表示32位的hash值
   - 例子：{ test: /\.css$/, use: ['style-loader', 'css-loader?modules&localIdentName=[path][name]-[local]-[hash:5]'] }
4. 使用 :local() 和 :global()
   - :local()包裹的类名，是被模块化的类名，只能通过className={cssObj.类名}来使用
     同时，:local默认可以不写，这样，默认在样式表中定义的类名，都是被模块化的类名；
   - :global()包裹的类名，是全局生效的，不会被 css-modules 控制，定义的类名是什么，就是使用定义的类名className="类名"
5. 注意：只有.title这样的类样式选择器，才会被模块化控制，类似于body这样的标签选择器，不会被模块化控制；





5.React 中绑定事件的注意点

1. 事件的名称都是React的提供的，因此名称的首字母必须大写onClick、onMouseOver
2. 为事件提供的处理函数
       <button onClick={ () => this.show('传参') }>按钮</button>
       
       // 事件的处理函数，需要定义为 一个箭头函数，然后赋值给 函数名称
       show = (arg1) => {
           console.log('show方法' + arg1)
       }
3. 在React中，如果想要修改 state 中的数据，推荐使用 this.setState({ })





6.使用ref获取DOM元素引用

和 Vue 中差不多，vue 为页面上的元素提供了 ref 的属性，如果想要获取 元素引用，则需要使用this.$refs.引用名称

在 React 中，也有 ref, 如果要获取元素的引用this.refs.引用名称





7. 组件的生命周期

- 生命周期的概念：每个组件的实例，从 创建、到运行、直到销毁，在这个过程中，会出发一些列 事件，这些事件就叫做组件的生命周期函数；
- React组件生命周期分为三部分：
  - 组件创建阶段：特点：一辈子只执行一次
  componentWillMount: 
  render：
  componentDidMount: 
  - 组件运行阶段：按需，根据 props 属性 或 state 状态的改变，有选择性的 执行 0 到多次
  componentWillReceiveProps:
  shouldComponentUpdate:
  componentWillUpdate: 
  render: 
  componentDidUpdate: 
  - 组件销毁阶段：一辈子只执行一次
  componentWillUnmount: 






















