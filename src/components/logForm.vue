<template>
  <div class="login-form">
    <div class="g-form">
      <div class="g-form-line">
        <span class="g-form-label">用户名：</span>
        <div class="g-form-input">
          <input type="text" 
          v-model="usernameModel" placeholder="请输入用户名">
        </div>
        <span class="g-form-error">{{usernameError}}</span>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">密码：</span>
        <div class="g-form-input">
          <input type="password" 
          v-model="passwordModel" placeholder="请输入密码">
        </div>
        <span class="g-form-error">{{passwordError}}</span>
      </div>

       
      <div class="g-form-line">
        <div class="g-form-btn">
          <p class="g-form-btn-error">{{errorText}}</p>
          <a class="button" @click="onLogin">登录</a>
        </div>
      </div>      
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      usernameModel: '',      
      passwordModel: '',
      errorText: '',  //未通过登录验证 提示
      userFirstFlag:false,  //用户名渲染时为空不报错
      passwordFirstFlag:false //密码渲染时为空不报错
    }
  },
  computed: {
    usernameError(){ 
      if(!this.usernameModel){
        if(!this.userFirstFlag){//用户名渲染时为空不报错        
          this.userFirstFlag=true;
          return '';
        }
        return '用户名不能为空！';
      }
      if(!(/^[a-zA-Z0-9_]{6,12}$/.test(this.usernameModel))){
        return '请输入6-12位字符';
      }       
      return '';
    },
    passwordError(){
      if(!this.passwordModel){
        if(!this.passwordFirstFlag){//密码渲染时为空不报错        
          this.passwordFirstFlag=true;
          return '';
        } 
        return '密码不能为空！';
      }
      if(!(/^[a-zA-Z0-9_]{6,12}$/.test(this.passwordModel))){
        return '请输入6-12位密码';
      }      
      return '';
    }
  },
  methods: {
    onLogin(){
      if(this.usernameError!==''||this.passwordError!==''){
        this.errorText="用户名或密码不正确";
      }else{
        this.errorText="";
        let param={"username":this.usernameModel};
         //通过用户名查询是否存在该用户信息
        this.$http.get('/api/getUser',JSON.stringify(param))
          .then((res)=>{
            console.log(res.data);//Array[2]
            if(res.data!==null){
              var users=res.data;            
              if(users.username==this.usernameModel&&users.password==this.passwordModel){
                this.$emit('has-log',users);
              }else{
                this.errorText="用户名或密码不正确";
              }
            }else{
              this.errorText="该用户名不存在";
            }  
          },(err)=>{
            console.log("请求getUser接口失败！"+err);
          })
      }      
    }
        
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*css在layout全局定义*/
</style>
