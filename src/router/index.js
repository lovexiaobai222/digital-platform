import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/pages/index'
import DetailPage from '@/pages/detail'
import countPage from '@/pages/detail/count'
import forecastPage from '@/pages/detail/forecast'
import analysisPage from '@/pages/detail/analysis'
import publishPage from '@/pages/detail/publish'
import orderListPage from '@/pages/orderList'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',  
      component: IndexPage
    },
    {
      path: '/detail',  
      component: DetailPage,
      children:[
        {
          path:"count",//数据统计
          component:countPage
        },
        {
          path:"forecast",//数据预测
          component:forecastPage
        },
        {
          path:"analysis",//流量分析
          component:analysisPage
        },
        {
          path:"publish",//广告发布
          component:publishPage
        },
      ]
    },
    {
      path:'/orderList',
      component: orderListPage
    }
  ]
})
