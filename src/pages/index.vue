<template>
  <div>
    <div class="index-wrap">
      <div class="index-left">
        <div class="index-left-block">
          <h2>全部产品</h2>
          <template v-for="product in productList">
            <h3 >{{product.title}}</h3>
            <ul>
              <li v-for="item in product.list">
                <a :href="item.url">{{item.name}}</a>
                <span v-if="item.hot" class="hot-tag">HOT</span>
              </li>
            </ul>
            <div v-if="!product.last" class="hr"></div>
          </template>        
        </div>

        <div class="index-left-block lastest-news">
          <h2>最新消息</h2> 
          <ul>
            <li v-for="news in newsList">
              <a :href="news.url" class="new-item">{{news.title}}</a>
            </li>
          </ul>       
        </div>
      </div>

      <div class="index-right">
        <my-slider :slides="slides" :interval="invTime"></my-slider>
        
        <div class="index-board-list">
          <div class="index-board-item" 
          v-for="(board,index) in boardList"
          :class="['index-board-'+board.id,{'line-last':(index+1)%2==0}]">
            <div class="index-board-item-inner">
              <h2>{{board.title}}</h2>
              <p>{{board.description}}</p>
              <router-link :to="{path:'/detail/'+board.toKey}">
                <div class="index-board-button button">
                  立即购买
                </div>
              </router-link> 
            </div>
          </div>
        </div>
      </div>

      
    </div>   
  </div>
</template>

<script>
import slider from '../components/slider'

export default {
  components:{
    'my-slider':slider,  //注册幻灯片组件
  },
  data () {
    return {
      productList:{ //全部产品 假数据列表
        pc:{
          title:'PC产品',
          list:[
            {
              name:'数据统计',
              url:'/detail/count'
            },
            {
              name:'数据预测',
              url:'/detail/forecast'
            },
            {
              name:'流量分析',
              url:'/detail/analysis',
              hot:true
            },
            {
              name:'广告发布',
              url:'/detail/publish'
            }
          ]
        },
        app:{
          title:'手机应用类',
          last:true,
          list:[
            {
              name:'91助手',
              url:'http://weixin.com'
            },
            {
              name:'产品助手',
              url:'http://twitter.com',
              hot:true
            },
            {
              name:'智能地图',
              url:'http://map.com'
            },
            {
              name:'团队语音',
              url:'http://phone.com'
            }
          ]
        }
      },//end productList

      newsList: [ //最新消息        
      ],//end newsList 

      boardList: [  //图文混排 广告牌
        {
          title: '开放产品',
          description: '开放产品是一款开放产品',
          id: 'car',
          toKey: 'analysis',
          saleout: false
        },
        {
          title: '品牌营销',
          description: '品牌营销帮助你的产品更好地找到定位',
          id: 'earth',
          toKey: 'count',
          saleout: false
        },
        {
          title: '使命必达',
          description: '使命必达快速迭代永远保持最前端的速度',
          id: 'loud',
          toKey: 'forecast',
          saleout: true
        },
        {
          title: '勇攀高峰',
          description: '帮你勇闯高峰，到达事业的顶峰',
          id: 'hill',
          toKey: 'publish',
          saleout: false
        }
      ],  //end boardList

      slides: [ //幻灯片
        {
          src: require('../assets/slideShow/pic1.jpg'),
          title: '001',
          href: 'detail/count'
        },
        {
          src: require('../assets/slideShow/pic2.jpg'),
          title: '002',
          href: 'detail/forecast'
        },
        {
          src: require('../assets/slideShow/pic3.jpg'),
          title: '003',
          href: '/detail/analysis'
        },
        {
          src: require('../assets/slideShow/pic4.jpg'),
          title: '004',
          href: '/detail/publish'
        }
      ], //end slides      

      invTime:2000, //幻灯片自动播放间隔时间
    }
  },
  created:function(){//es5 组件创建完毕后
    this.$http.get('/api/getNewsList')
      .then((res)=>{ //回调成功
        this.newsList=res.data;//this得益于闭包函数:指向代码环境下的this,而不是执行环境下的this
      },(err)=>{ //回调失败
        console.log('回调失败'+err);
      });//promise对象的回调函数
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index-wrap {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.index-left {
  float: left;
  width: 300px;
  text-align: left;
}
.index-right {
  float: left;
  width: 900px;
}
.index-left-block {
  margin: 15px;
  background: #fff;
  box-shadow: 0 0 1px #ddd;
}
.index-left-block .hr {
  margin-bottom: 20px;
}
.index-left-block h2 {
  background: #4fc08d;
  color: #fff;
  padding: 10px 15px;
  margin-bottom: 20px;
}
.index-left-block h3 {
  padding: 0 15px 5px 15px;
  font-weight: bold;
  color: #222;
}
.index-left-block ul {
  padding: 10px 15px;
}
.index-left-block li {
  padding: 5px;
}
/*广告牌*/
.index-board-list {
  overflow: hidden;
}
.index-board-item {
  float: left;
  width: 400px;
  background: #fff;
  box-shadow: 0 0 1px #ddd;
  padding: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
}
.index-board-item-inner {
  min-height: 125px;
  padding-left: 120px;
}
.index-board-car .index-board-item-inner{
  background: url(../assets/images/1.png) no-repeat;
}
.index-board-loud .index-board-item-inner{
  background: url(../assets/images/2.png) no-repeat;
}
.index-board-earth .index-board-item-inner{
  background: url(../assets/images/3.png) no-repeat;
}
.index-board-hill .index-board-item-inner{
  background: url(../assets/images/4.png) no-repeat;
}
.index-board-item h2 {
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin-bottom: 15px;
}

.line-last {  
  margin-right: 0;/*一行最后一个*/
}
.index-board-button {
  margin-top: 20px;
}
.lastest-news {
  min-height: 512px;
}
.hot-tag {
  background: red;
  color: #fff;
}
.new-item {
  display: inline-block;
  width: 230px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
