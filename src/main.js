// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Layout from './components/layout'
import router from './router'
import VueResource from 'vue-resource'
import store from './store'


Vue.config.productionTip = false
Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,	//注册全局数据仓库
  template: '<Layout/>',//使用Layout组件
  components: { Layout }//注册Layout组件
})
