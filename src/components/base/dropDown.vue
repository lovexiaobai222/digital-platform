<template>
  <div class="selection-component">
    <div class="selection-show">
      <span @click="changeDrop">{{showItem}}</span>
      <div class="arrow" @click="changeDrop"></div>
    </div>
    <div class="selection-list" v-show="isDrop">
      <ul>
        <li v-for="item in selections" @click="choiceItem(item.label)">{{item.label}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    selections:{
      type:Array,
      default:[
        {
          label:"选项一",
          value:"0"
        },
        {
          label:"选项二",
          value:"1"
        },
      ]
    }
  },
  data(){
    return{
      isDrop:false,//是否下拉显示
      showItem:"",//选中项
    }
  },
  methods:{
    changeDrop(){
      this.isDrop=!this.isDrop;
    },
    choiceItem(value){  //选中值后
      this.showItem=value;
      this.changeDrop();
      //回调：将下拉选中值传送给父组件保存
      this.$emit("on-change",value);
    }
  },
  mounted(){
    this.showItem=this.selections[0].label;
  }
  
}
</script>

<style scoped>
.selection-component{
  position: relative;
  display: inline-block;
}
.selection-show{
  border: 1px solid #e3e3e3;
  padding: 0 20px 0 10px;
  display: inline-block;
  position: relative;
  cursor: pointer;
  height: 25px;
  line-height: 25px;
  border-radius: 3px;
  background: #fff;
}
.selection-show .arrow{
  display: inline-block;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid #e3e3e3;
  width: 0;
  height: 0;  
  margin: -1px -10px 0 6px; 
  vertical-align: middle;  
}
.selection-list{
  display: inline-block;
  position: absolute;
  left: 0;
  top: 25px;
  width: 100%;
  background: #fff;
  border-top:1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3;
  z-index: 5;
}
.selection-list li{
  padding: 5px 15px 5px 10px;
  border-left: 1px solid #e3e3e3;
  border-right: 1px solid #e3e3e3;
  cursor: pointer;
  background: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.selection-list li:hover{
  background: #e3e3e3;
}
</style>
