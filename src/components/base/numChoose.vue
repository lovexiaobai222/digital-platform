<template>
  	<div class="counter-component">
      <div class="counter-btn" @click="minusNum"> - </div>
      <div class="counter-show">
        <input type="text" v-model="buyNum" @keyup="writeNum">
      </div>
      <div class="counter-btn" @click="addNum"> + </div>
    </div>
</template>

<script>
export default {
	props:{
		max:{
			type:Number,
			default:10
		},
		min:{
			type:Number,
			default:1
		}
	},
	data(){
		return{
			buyNum:this.min,	//默认购买数量
		}
	},
	methods:{
		minusNum(){
			if(this.buyNum>this.min){
				this.buyNum--;
			}else{
				this.buyNum=this.min;
			}
		},
		addNum(){
			if(this.buyNum<this.max){
				this.buyNum++;
			}else{
				this.buyNum=this.max;
			}
		},
		writeNum(){	//手动键入Num
			//输入的字符，(正则)处理后保存下来
			// console.log(typeof this.buyNum);//string
			if(typeof this.buyNum === 'string'){
				this.buyNum=Number(this.buyNum.replace(/\D/g,''));
			}
			if(this.buyNum>=this.max){
				this.buyNum=this.max;
			}
			if(this.buyNum<=this.min){
				this.buyNum=this.min;
			}
		}
	},
	watch:{
		buyNum(){	//监听buyNum变量，一旦改变立即触发监听
			this.$emit("on-change",this.buyNum);
		}
	}
}
</script>

<style scoped>
.counter-component {
  position: relative;
  display: inline-block;
  overflow: hidden;
  vertical-align: middle;
}
.counter-show {
  float: left;
}
.counter-show input {
  border: none;
  border-top: 1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3;
  height: 23px;
  line-height: 23px;
  width: 30px;
  outline: none;
  text-align: center;
  /*text-indent: 4px;*/
}
.counter-btn {
  border: 1px solid #e3e3e3;
  float: left;
  height: 25px;
  line-height: 25px;
  width: 25px;
  text-align: center;
  cursor: pointer;
}
.counter-btn:hover {
  border-color: #4fc08d;
  background: #4fc08d;
  color: #fff;
}
</style>
