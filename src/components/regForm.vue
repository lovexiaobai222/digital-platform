<template>
  <div class="login-form">
    <div class="g-form">
      <div class="g-form-line">
        <span class="g-form-label">用户名：</span>
        <div class="g-form-input">
          <input type="text" v-model="usernameModel"
           placeholder="请输入用户名">
        </div>
        <span class="g-form-error">{{usernameError}}</span>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">密码：</span>
        <div class="g-form-input">
          <input type="password" v-model="passwordModel"
          placeholder="请输入密码">
        </div>
        <span class="g-form-error">{{passwordError}}</span>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">确认密码：</span>
        <div class="g-form-input">
          <input type="password" v-model="rePasswordModel"
           placeholder="请确认输入密码">
        </div>
        <span class="g-form-error">{{rePasswordError}}</span>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">邮箱：</span>
        <div class="g-form-input">
          <input type="email" v-model="emailModel"
           placeholder="请输入邮箱">
        </div>
        <span class="g-form-error">{{emailError}}</span>
      </div>
      <div class="g-form-line">
        <div class="g-form-btn">
          <a class="button" @click="onRegister">注册</a>
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
      rePasswordModel:'',
      emailModel:'',

      errorText: '',  //未通过注册验证 提示
      userFirstFlag:false,  //用户名渲染时为空不报错
      passwordFirstFlag:false, //密码渲染时为空不报错
      rePasswordFirstFlag:false,  //确认密码渲染时为空不报错
      emailFirstFlag:false //邮箱渲染时为空不报错
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
    },
    rePasswordError(){
      if(!this.rePasswordModel){
        if(!this.rePasswordFirstFlag){//密码渲染时为空不报错        
          this.rePasswordFirstFlag=true;
          return '';
        } 
        return '确认密码不能为空！';
      }
      if(this.rePasswordModel!=this.passwordModel){
        return '请与密码保持一致！';
      }      
      return '';
    },
    emailError(){
      if(!this.emailModel){
        if(!this.emailFirstFlag){//邮箱渲染时为空不报错        
          this.emailFirstFlag=true;
          return '';
        } 
        return '邮箱不能为空！';
      }
      if(!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(this.emailModel))){
        return '邮箱格式不正确';
      }
      return '';
    }
  },
  methods: {
    onRegister(){
      if(this.usernameError!==''||this.passwordError!==''||this.rePasswordError!==''||this.emailError!==''){
        this.errorText="请正确填写注册信息";
      }else{
        this.errorText="";
        let param={
          "username":this.usernameModel,
          "password":this.passwordModel,
          "email":this.emailModel
        };
         //通过post注册用户信息
        this.$http.post('/api/regUser',JSON.stringify(param))
          .then((res)=>{
            // console.log(res);
            if(res.data!==null){
              //注册成功，回调父组件自动登录
              let user={
                "username":this.usernameModel,
                "password":this.passwordModel
              };
              this.$emit('reg-sucess',user);
            }
          },(err)=>{
            console.log("请求regUser接口失败！"+err);
          })
      }      
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*样式在layout内，作为一个全局样式的存在*/
</style>
