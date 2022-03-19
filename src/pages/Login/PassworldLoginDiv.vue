<template>
  <div id="passwdLoginDiv">
      <div id="nameInputDiv">
          <input type="text" v-model="accountName">
      </div>
      <div id="passwdDiv">
          <input type="password" v-model="password">
      </div>
      <div id="checkCode">
          <input type="text" placeholder="验证码" v-model="checkCode">
          <img src="http://127.0.0.1:4000/captcha" alt="">
      </div>

      <LoginCheckNotify v-show="alertShow" :showText="alertText" :showButton="alertButtonShow" :closeSelf="closeAlert" class="successNotify"/>  
  
  </div>
</template>

<script>

import LoginCheckNotify from "../../components/LoginCheckNotify.vue"

export default {
    name:'PassworldLoginDiv',
    data:function(){
        return {
            alertText:"",
            alertButtonShow:true,
            alertShow:false,
            accountName:"",
            password:"",
            checkCode:""
        }
    },
    components:{
        LoginCheckNotify
    },
    methods:{    
        showAlert(text,showBtn){
            this.alertText=text
            this.alertShow=true
            this.alertButtonShow=showBtn
        },
        closeAlert(){
            this.alertShow=false
        },
        loginCheck(){
            if(!this.accountName){
                this.showAlert("请输入账号!",true)
                return
            }else if(!this.password){
                this.showAlert("请输入密码!",true)
                return
            }
            else if(!this.checkCode){
                this.showAlert("请填写校验码!",true)
                return
            }
            this.loginTimer = setTimeout(() => {
                this.$bus.$emit("loginCheckOk",2,this.accountName,this.password,this.checkCode)
            }, 2000);
        }
    },
    mounted(){
        this.$bus.$on("loginCheck",this.loginCheck)
    },
    beforeDestroy(){
        this.$bus.$off('loginCheck')
        clearInterval(this.loginTimer)
    }
}
</script>

<style lang="less" scoped>
    @import '../../common/css/style.less';

    #passwdLoginDiv #nameInputDiv,
    #passwdLoginDiv #passwdDiv,
    #passwdLoginDiv #checkCode{
        width:@loginDivWidth;
        margin:(10rem/40) auto;
        border:1px solid grey;
        height: (40rem/40);
        border-radius: (4rem/40);
    }

    #passwdLoginDiv input{
        margin:0;
        padding:0;
        line-height: (40rem/40);
        border:none;
        border-radius: (4rem/40);
        padding-left:6px;
        width:@loginInputWidth;
    }

    #passwdLoginDiv #checkCode input{
        width:(200rem/40);
        vertical-align: top;
    }

     #passwdLoginDiv #checkCode img{
         width:(110rem/40);
         height: (40rem/40);
     }
</style>