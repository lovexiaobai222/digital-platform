<template>
	<div>
		<div class="app-header">
			<div class="app-head-inner">
        <router-link :to="{path:'/'}">
          <img src="../assets/logo.png">
          <span>数字产品电商平台</span>
        </router-link>        
        <div class="head-nav">
          <ul class="nav-list">
            <li v-if="isLogin">{{username}}</li>
            <li class="nav-pile" v-if="isLogin">|</li>	         
            <li v-if="!isLogin" @click="showMyDialog('isShowLogDialog')">登录</li>
            <li v-else="isLogin" @click="exitLogin">退出</li>
            <li class="nav-pile" v-if="!isLogin">|</li>
            <li v-if="!isLogin" @click="showMyDialog('isShowRegDialog')">注册</li>
            <li class="nav-pile">|</li>
            <li @click="showMyDialog('isShowAboutDialog')">关于</li>
          </ul>
        </div> 
      </div> 
		</div>
		<div class="app-content">
      <keep-alive>
        <router-view/>  
      </keep-alive>
    </div>
		<div class="app-footer">
			<p>© 2017 CrisBai MIT</p>
		</div>

    <my-dialog :isShow="isShowLogDialog" @on-close="closeMyDialog('isShowLogDialog')">
      <my-logForm @has-log="hasSuccessLogin"></my-logForm>
    </my-dialog>
    <my-dialog :isShow="isShowRegDialog" @on-close="closeMyDialog('isShowRegDialog')">
      <my-regForm @reg-sucess="autoLogin"></my-regForm>
    </my-dialog>
    <my-dialog :isShow="isShowAboutDialog" @on-close="closeMyDialog('isShowAboutDialog')">
      <p>本报告在调研数据的基础上，采用定性与定量相结合的方式深入分析了专车市场发展的驱动因素与阻碍因素、专车市场背后的产业格局、专车企业的竞争格局、用户对专车市场的依赖程度、专车对其他交通工具运力的补充效应等，通过这五个章节的研究反映专车市场的发展态势和面临的问题。报告力求客观、深入、准确地反映中国专车市场发展情况，为政府、企事业单位和社会各界提供决策依据。 </p>
    </my-dialog>
    
	</div>
</template>

<script>
import dialog from '../components/base/dialog'
import logForm from '../components/logForm'
import regForm from '../components/regForm'
export default{
  components:{ 
    'my-dialog':dialog,  //注册弹出框组件
    'my-logForm':logForm,  //注册登录组件
    'my-regForm':regForm,  //注册注册组件
  },
	data(){
    return{
      isShowLogDialog:false,
      isShowRegDialog:false,
      isShowAboutDialog:false,
      username:'',
      isLogin:false //根据登录状态显示头部内容
    }
	},
  methods:{
    showMyDialog(attr){
      this[attr]=true;
    },
    closeMyDialog(attr){
      this[attr]=false;
    },
    hasSuccessLogin(user){  //登录成功，此处应把用户信息存入全局共享
      this.isLogin=true;
      this.closeMyDialog('isShowLogDialog');
      // console.log(user);//打印子组件传过来的user
      this.username=user.username;
    },
    exitLogin(){
      this.isLogin=false;
    },
    autoLogin(user){
      // console.log(user);
      this.isLogin=true;
      this.closeMyDialog('isShowRegDialog');
      this.username=user.username;
    }
  }

}
</script>

<style>
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
a {
  color: inherit;
  text-decoration: none;
}
body {
  background: #f0f2f5;
  font-family: "Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Hiragino Sans GB W3","Microsoft YaHei UI","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
  font-size: 14px;
  color: #444;
}
.app-header {
  background: #363636;
  color: #b2b2b2;
  height: 90px;
  line-height: 90px;
  width: 100%;
}
.app-head-inner {
  width: 1200px;
  margin: 0 auto;
}
.head-logo {
  float: left;
}
.app-head-inner img {
  width: 50px;
  margin-top: 20px;
}
.head-nav {
  float: right;
}
.head-nav ul {
  overflow: hidden;
}
.head-nav li {
  cursor: pointer;
  float: left;
}
.nav-pile {
  padding: 0 10px;
}
.app-footer {
  text-align: center;
  height: 80px;
  width: 100%;
  line-height: 80px;
  background: #e3e4e8;
  clear: both;
  margin-top: 30px;
}

.content {
  width: 1200px;
  margin: 0 auto;
}
.hr {
  height: 1px;
  width: 100%;
  background: #ddd;
}
.button {
  background: #4fc08d;
  color: #fff;
  display: inline-block;
  padding: 10px 20px;
  cursor: pointer;
}
.button:hover {
  background: #4fc08d;
}
.g-form {

}
.g-form-line {
  padding: 15px 0;
}
.g-form-label {
  width: 100px;
  font-size: 16px;
  display: inline-block;
}
.g-form-input {
  display: inline-block;
}
.g-form-input input {
  height: 30px;
  width: 200px;
  line-height: 30px;
  vertical-align: middle;
  padding: 0 10px;
  border: 1px solid #ccc;
}
.g-form-btn {
  padding-left: 100px;
}
.g-form-error {
  color: red;
  padding-left: 15px;
}
.g-form-btn-error{
  color: red;
  padding-bottom: 10px;
}
</style>