<template>
  <div>
    <my-dialog :isShow="isShow" @on-close="closeMyDialog">
      <span>请确认支付状态：</span>
      <div class="button buy-dialog-btn" @click="checkPayState">
            支付成功
      </div>
      <div class="button buy-dialog-btn" @click="">
            支付失败
      </div>
    </my-dialog>
    <my-dialog :isShow="isShowPayFail" @on-close="closePayFailDialog">不好意思，您的订单支付失败！请重新下单</my-dialog>
  </div>
</template>

<script>
import dialog from '@/components/base/dialog'
export default {
  components:{
    'my-dialog':dialog,
  },
  props:{
    isShow:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return{      
      payState:false,
      isShowPayFail:false,
    }
  },
  methods:{
    closeMyDialog(){
      this.$emit('on-close');
    },
    checkPayState(){  //按下 支付成功
      //请求后端接口，确认支付状态为true或false
      this.$http.get('/api/getPayState')
        .then((res)=>{
          // console.log(res.data.payState);
          this.payState=res.data.payState;
          //为true则后端接口跳转 订单列表，为false 则弹出支付失败弹窗
          if(this.payState){
            this.$router.push({path:'/orderList'});
          }else{
            this.isShowPayFail=true;
          }
        },(err)=>{
          console.log("请求getPayState接口失败："+err);
        });
    },
    closePayFailDialog(){
      this.isShowPayFail=false;
    }
  }
  
}
</script>

<style scoped>

</style>
