<template>
  <div class="chooser-component">
  	<ul class="chooser-list">
  		<li v-for="(item,index) in multiItems"
  		:class="{active: checkActive(index)}"
  		@click="choiceItem(item)">{{item.label}}</li>
  	</ul>  	
  </div>
</template>

<script>
import _ from 'lodash'
export default {
   props:{
   	 multiItems:{
   	 	type:Array,
   	 	default(){
   	 		return [
	   	 		{
	   	 			label:'选项一',
	   	 			value:0
	   	 		},
	   	 		{
	   	 			label:'选项二',
	   	 			value:1
	   	 		}
	   	 	]
   	 	}
   	 	
   	 }
   },
   data(){
   	return{
   		nowIndex:[0],//被选中下标
   	}
   },
   methods:{
   	choiceItem(item){	
   		//选中后激活
   		if(this.nowIndex.indexOf(item.value)==-1){
   			this.nowIndex.push(item.value);
   		}else{
   			this.nowIndex=_.remove(this.nowIndex,(idx)=>{
   				return idx!==item.value;
   			});
   		}
   		// console.log(this.nowIndex);
   		//选中后回调
   		let chooseItems = _.map(this.nowIndex, (idx) => {
	       return this.multiItems[idx].label;
	    })
   		// console.log(chooseItems);
   		this.$emit('on-change',chooseItems);
   	},
   	checkActive (index) {
      return this.nowIndex.indexOf(index) !== -1
    }
   }


}
</script>

<style scoped>
.chooser-component{
	position: relative;
	display: inline-block;
}
.chooser-list li{
	display: inline-block;
	border: 1px solid #e3e3e3;
	height: 25px;
	line-height: 25px;
	padding: 0 8px;
	margin-right: 10px;
	border-radius: 3px;
	text-align: center;
	cursor: pointer;
}
.chooser-list li.active{
	border-color: #4fc08d;
	background: #4fc08d;
	color: #fff;
}
</style>
