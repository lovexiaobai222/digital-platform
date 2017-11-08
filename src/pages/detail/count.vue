<template>
  <div class="sales-board">
      <div class="sales-board-intro">
        <h2>数据统计</h2>
        <p>历史资料、科学实验、检验、统计等所获得的和用于科学研究、技术设计、查证、决策等的数值加以统计为解决方案做前期准备。</p>
      </div>
      <div class="sales-board-form">
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  产品类型：
              </div>
              <div class="sales-board-line-right">
                  <V-dropDown :selections="productTypes" @on-change="getProductType"></V-dropDown>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  适用地区：
              </div>
              <div class="sales-board-line-right">
                  <V-multiChoose :multiItems="districts" @on-change="getDistricts"></V-multiChoose>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  有效时间：
              </div>
              <div class="sales-board-line-right">
                  <V-singleChoose :singleItems="validTimes" @on-change="getValidTime"></V-singleChoose>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  总价：
              </div>
              <div class="sales-board-line-right">
                  {{totalPrice}}
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">&nbsp;</div>
              <div class="sales-board-line-right">
                  <div class="button" @click="confirmPay">
                    立即购买
                  </div>
              </div>
          </div>
      </div>
      <div class="sales-board-des">
        <h2>产品说明</h2>
        <p>历史资料、科学实验、检验、统计等所获得的和用于科学研究、技术设计、查证、决策等的数值加以统计为解决方案做前期准备。</p>
        <table class="sales-board-table">
          <tbody>
              <tr class="ui-table-row">
                  <td class="col-first">
                      <div class="intro-pic">
                          <label>安全安保</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>办公文教</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>彩票</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>车辆物流</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>成人用品</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>出版传媒</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>电脑硬件</label>
                      </div>
                  </td>
              </tr>
              <tr class="ui-table-row">
                  <td class="col-first">
                      <div class="intro-pic">
                          <label>电子电工</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>房地产建筑装修</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>分类平台</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>服装鞋帽</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>箱包饰品</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>化工原料制品</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>机械设备</label>
                      </div>
                  </td>
              </tr>
              <tr class="ui-table-row">
                  <td class="col-first">
                      <div class="intro-pic">
                          <label>家庭日用品</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>家用电器</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>教育培训</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>节能环保</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>金融服务</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>礼品</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>旅游住宿</label>
                      </div>
                  </td>
              </tr>
          </tbody>
        </table>
      </div>
      <V-dialog :isShow="showConfirmPay" @on-close="closeConfirmPay">
          <h2 class="check-order-info">确认订单：</h2>
          <table class="buy-dialog-table">
            <tr>
              <th>产品类型</th>
              <th>适用地区</th>
              <th>有效时间</th>
              <th>总价</th>
            </tr>
            <tr>
              <td>{{productType}}</td>
              <td><span v-for="item in distinct">{{item}}</span></td>
              <td>{{validTime}}</td>
              <td>{{totalPrice}}</td>
            </tr>
          </table>
          <h2 class="check-order-info">支付方式：</h2>
          <V-bankchoose @on-change="getBank"></V-bankchoose>
          <div class="button buy-dialog-btn" @click="confirmBuy">
            确认购买
          </div>
      </V-dialog>
      
      <V-checkPayState :isShow="showPayState" @on-close="closePayState"></V-checkPayState>
  </div>
</template>

<script>
import dropDown from '../../components/base/dropDown'
import multiChoose from '../../components/base/multiChoose'
import singleChoose from '../../components/base/singleChoose'
import dialog from '../../components/base/dialog'
import bankchoose from '../../components/base/bankchoose'
import checkPayStateDialog from '../../components/checkPayStateDialog'
export default {
  components:{
    "V-dropDown":dropDown,
    "V-multiChoose":multiChoose,
    "V-singleChoose":singleChoose,
    'V-dialog':dialog,  //注册弹出框组件
    'V-bankchoose':bankchoose,  
    'V-checkPayState':checkPayStateDialog,
  },
  data () {
    return {     
      productTypes: [ //购买的 产品类型
        {
          label: '红色版',
          value: 0
        },
        {
          label: '绿色版',
          value: 1
        },
        {
          label: '紫色版',
          value: 2
        }
      ],
      districts: [  //适用地区
        {
          label: '北京',
          value: 0
        },
        {
          label: '上海',
          value: 1
        },
        {
          label: '广州',
          value: 2
        },
        {
          label: '天津',
          value: 3
        },
        {
          label: '武汉',
          value: 4
        },
        {
          label: '重庆',
          value: 5
        },
      ],
      validTimes:[   //有效时间
        {
          label:"半年",
          value:0
        },
        {
          label:"一年",
          value:1
        },
        {
          label:"两年",
          value:2
        }
      ],
      productType:"",//默认选中的产品类型
      distinct:[],  //默认选中的适用地区
      validTime:"",//默认选中的有效时间  
      totalPrice:120,    
      bank:null,
      showConfirmPay:false,
      showPayState:false,
    }
  },
  methods:{
    getPrice(){
      let params={
        "productType":this.productType,
        "districts":this.distinct,
        "validTime":this.validTime
      };
      // console.log(params);
      //发送ajax请求getTotalPrice接口，后台接收参数并计算后返回一个确切的总价，此仅模拟得到后台计算的总价
      this.$http.get("/api/getTotalPrice",JSON.stringify(params))
        .then((res)=>{
          this.totalPrice=res.data[0].totalPrice;
        },(err)=>{
          console.log("请求getTotalPrice接口失败："+err);
        })
    },
    getProductType(item){
      // console.log(item);
      this.productType=item;
      this.getPrice();
    },
    getDistricts(items){
      // console.log(this.distinct);
      this.distinct=items;
      this.getPrice();
    },
    getValidTime(item){
      // console.log(item);
      this.validTime=item;
      this.getPrice();
    },
    

    confirmPay(){   //按下立即购买
      this.showConfirmPay=true;
    },
    closeConfirmPay(){
      this.showConfirmPay=false;
    }, 
    getBank(bank){
      this.bank=bank;
    },   
    confirmBuy(){ 
      this.showConfirmPay=false;
      //按下确认购买,将订单信息传入后端接口，并开启另一页面支付窗口

      this.showPayState=true; //显示支付状态弹窗
    },
    closePayState(){
      this.showConfirmPay=false;
      this.showPayState=false;
    },
    
  },
  mounted () {  //加载完成初始化
    this.productType = this.productTypes[0].label;
    this.distinct = [this.districts[0].label];
    this.validTime = this.validTimes[0].label;
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*共享detail样式*/
.detail-wrap {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
  padding-top: 20px;
}
.detail-left {
  float: left;
  width: 200px;
  text-align: center;
}
.detail-right {
  float: left;
  width: 980px;
  margin-left: 20px;
}
.product-board {
  background: #fff;
  padding: 20px 0;
}
.product-board ul {
  margin-top: 20px;
}
.product-board li {
  text-align: left;
  padding: 10px 15px;
  cursor: pointer;
}
.product-board li.active,
.product-board li:hover {
  background: #4fc08d;
  color: #fff;
}
.product-board li a {
  display: block;
}
.sales-board {
  background: #fff;
}
.sales-board-form {

}
.sales-board-intro h2 {
  font-size: 20px;
  padding: 20px;
}
.sales-board-intro p {
  background: #f7fcff;
  padding: 10px 20px;
  color: #999;
  line-height: 1.8;
}
.sales-board-form {
  padding: 30px 20px;
  font-size: 14px;
}
.sales-board-line {
  clear: both;
  padding-bottom: 20px;
}
.sales-board-line-left {
    display: inline-block;
    width: 100px;
}
.sales-board-line-right {
    display: inline-block;
    width: 75%;
}
.sales-board-des {
  border-top: 20px solid #f0f2f5;
  padding: 15px 20px;
}
.sales-board-des p {
  line-height: 1.6;
}
.sales-board-des h2 {
  font-size: 20px;
  padding-bottom: 15px;
}
.sales-board-des h3 {
  font-size: 18px;
  font-weight: bold;
  padding: 20px 0 10px 0;
}
.sales-board-des li {
  padding: 5px 0;
}
.sales-board-table {
  width: 100%;
  margin-top: 20px;
}
.sales-board-table th {
  background: #4fc08d;
  color: #fff;
}
.sales-board-table td {
    border: 1px solid #f0f2f5;
    padding: 15px;
}
h2.check-order-info{
  font-size: 16px;
  font-weight: bold;
  color: #4fc08d;
  padding-bottom: 10px;
}
</style>
