<template>
  <div class="slide-show" @mouseover="clearInv" @mouseout="runInv">
    
    <div class="slide-img">
      <a>
        <transition name="slide-trans">
          <router-link :to="{path:slides[nowIndex].href}">
            <img v-if="isSwitch" :src="slides[nowIndex].src">
          </router-link>
        </transition>
        <transition name="slide-trans-old">
          <router-link :to="{path:slides[nowIndex].href}">
            <img v-if="!isSwitch" :src="slides[nowIndex].src">
          </router-link>
        </transition></a>
      </a>
    </div>    

    <h2>{{slides[nowIndex].title}}</h2>
    <ul class="slide-pages">
      <li @click="goto(prevIndex)">&lt;</li>
      <li v-for="(item,index) in slides" @click="goto(index)">
        <a :class="nowIndex==index?'on':''">{{index+1}}</a>
      </li>
      <li @click="goto(nextIndex)">&gt;</li>
    </ul>
  </div>
</template>

<script>
export default{
  props:{ //接收父组件通过属性传过来的信息
    slides:{  //获取父组件的slides属性值
      type:Array,
      default:[]
    },
    interval:{
      type:Number,
      default:1000
    }
  },
	data(){
    return{
      nowIndex:1,
      runId:null,
      isSwitch:true //是否切换
    }
	},
  computed:{ //计算属性，保护+计算变量
    prevIndex(){
      if(this.nowIndex!==0){
        return this.nowIndex-1;
      }else{        
        return this.slides.length-1;
      }      
    },
    nextIndex(){
      if(this.nowIndex!==this.slides.length-1){
        return this.nowIndex+1;
      }else{        
        return 0;
      }      
    }    
  },
  methods:{
    goto(index){  //手动跳转响应幻灯片
      this.isSwitch=false;
      setTimeout(()=>{  //仅延迟10毫秒，执行一次
        this.isSwitch=true;
        this.nowIndex=index;
      },10);      
    },
    runInv(){
      this.runId=setInterval(()=>{
        this.goto(this.nextIndex);
      },this.interval);
    },
    clearInv(){
      clearInterval(this.runId);
    }
  },
  mounted(){//es6 组件加载/渲染完毕后
    this.runInv();//自动跳转
  }
}
</script>

<style scoped>
.slide-trans-enter-active {
  transition: all .5s;
}
.slide-trans-enter {
  transform: translateX(900px);
}
.slide-trans-old-leave-active {
  transition: all .5s;
  transform: translateX(-900px);
}
.slide-show {
  position: relative;
  margin: 15px 15px 15px 0;
  width: 900px;
  height: 500px;
  overflow: hidden;
}
.slide-show h2 {
  position: absolute;
  width: 100%;
  height: 100%;
  color: #fff;
  background: #000;
  opacity: .5;
  bottom: 0;
  height: 30px;
  text-align: left;
  padding-left: 15px;
}
.slide-img {
  width: 100%;
}
.slide-img img {
  width: 100%;
  position: absolute;
  top: 0;
}
.slide-pages {
  position: absolute;
  bottom: 10px;
  right: 15px;
}
.slide-pages li {
  display: inline-block;
  padding: 0 10px;
  cursor: pointer;
  color: #fff;
}
.slide-pages li .on {
  text-decoration: underline;
}
</style>