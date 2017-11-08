<template>
  <div class="order-wrap">
    <h3>您的产品</h3>
    <div class="order-list-choose">
      <div class="order-list-option">
        选择产品：
        <V-dropDown :selections="products" @on-change="getProduct"></V-dropDown>
      </div>

      <div class="order-list-option">
        开始日期：
        <V-datePicker @on-change="getBeginDate"></V-datePicker>
      </div>

      <div class="order-list-option">
        结束日期：
        <V-datePicker @on-change="getEndDate"></V-datePicker>
      </div>

      <div class="order-list-option">
        关键词：
        <input type="text" v-model.lazy="queryKeyword"  class="order-query">
      </div>
    </div>
    <div class="order-list-table">
      <table>
        <tr>
          <th v-for="item in tableHeads">{{item.label}}</th>
        </tr>
        <tr v-for="order in tableDatas">
          <td v-for="head in tableHeads">{{order[head.key]}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import dropDown from '../components/base/dropDown'
import datePicker from '../components/base/datePicker'

export default {
  components:{
    'V-dropDown':dropDown,
    'V-datePicker':datePicker,
  },
  data(){
    return{
      products: [
        {
          label: '数据统计',
          value: 0
        },
        {
          label: '数据预测',
          value: 1
        },
        {
          label: '流量分析',
          value: 2
        },
        {
          label: '广告发布',
          value: 3
        }
      ],
      tableHeads: [
        {
          label: '订单号',
          key: 'orderId'
        },
        {
          label: '购买产品',
          key: 'product'
        },
        {
          label: '版本类型',
          key: 'version'
        },
        {
          label: '有效时间',
          key: 'period'
        },
        {
          label: '购买日期',
          key: 'date'
        },
        {
          label: '数量',
          key: 'buyNum'
        },
        {
          label: '总价',
          key: 'amount'
        }
      ],
      tableDatas:[],
      queryProduct:"",
      beginDate:"",
      endDate:"",
      queryKeyword:""
    }
  },
  watch:{
    queryKeyword(){ //仅监听查询关键字属性
      this.getOrderList();
    }
  },
  methods:{
    getOrderList(){
      let reqParams={
        "queryProduct":this.queryProduct,
        "beginDate":this.beginDate,
        "endDate":this.endDate,
        "queryKeyword":this.queryKeyword
      };
      this.$http.get("/api/getOrderList",reqParams)
      .then((res)=>{
        // console.log(res.data.list);
        this.tableDatas=res.data.list;
      },(err)=>{
        console.log("请求getOrderList接口失败："+err);
      });
    },
    getProduct(value){
      this.queryProduct=value;
      this.getOrderList();
    },
    getBeginDate(value){
      this.beginDate=value;
      this.getOrderList();
    },
    getEndDate(value){
      this.endDate=value;
      this.getOrderList();
    }
  },
  mounted(){
    this.getOrderList();
    // console.log(this.$store);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.order-wrap {
  width: 1200px;
  min-height: 800px;
  margin: 20px auto;
  overflow: hidden;
}
.order-wrap h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
.order-query {
  height: 25px;
  line-height: 25px;
  border: 1px solid #e3e3e3;
  outline: none;
  text-indent: 10px;
}
.order-list-option {
  display: inline-block;
  padding-left: 15px;
}
.order-list-option:first-child {
  padding-left: 0;
}
.order-list-table {
  margin-top: 20px;
}
.order-list-table table {
  width: 100%;
  background: #fff;
}
.order-list-table td,
.order-list-table th {
  border: 1px solid #e3e3e3;
  text-align: center;
  padding: 10px 0;
}
.order-list-table th {
  background: #4fc08d;
  color: #fff;
  border: 1px solid #4fc08d;
  cursor: pointer;
}
.order-list-table th.active {
  background: #35495e;
}
</style>
