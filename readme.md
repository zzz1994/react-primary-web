## 本项目实战说明
1. 该站点是使用ES6+React+Router+fetch开发的一个新闻站点。
2. 开发环境使用node + webpack等搭建。
3. 本站点同时支持移动端和PC端
4. 本项目是用于React入门的一个实战开发，还有许多功能上的细节待完善和开发。
5. 本项目的UI是借助于[AntDesign](https://ant.design/index-cn)完成的

### 响应式开发
1. 使用[react-responsive](https://github.com/contra/react-responsive)进行响应式开发。
2. PC端功能和移动端基本相同，可以先开发PC端，然后利用PC端代码进行修改

### 模块说明
下面会按照开发顺序对模块进行解释。
1. root.js：整个站点的入口文件
2. pc_header.js和pc_footer.js是页面的页头和页脚。
	* 这里需要注意的一点是，因为pc_header.js用到了Form，这里需要对PCHeader进行二次封装。
3. pc_index.js: pc端主页面的容器页面。
4. pc_newscontainer.js: pc端页面的新闻部分容器页面。
	* 在该页面有个图片轮播。
	* 会使用pc_news_block.js和pc_news_image_block.js定义的模块
5. pc_news_block.js：新闻列表模块，可以自定义新闻类型和数量。
6. pc_news_image_block.js: 带有图片的新闻。
7. common_comments.js： pc端和移动端共有的添加收藏和评论的模块。
7. pc_usercenter.js：pc端用户中心

Tips:
1. 移动端逻辑和PC端逻辑几乎完全一致，区别在于布局的不同。
2. AntDesign的组件本身就是响应式的。
