<template>
  <div id="comDiv">
      <div id="backArrow">
        <span @click="$router.back()" class="fas fa-chevron-left"></span>
      </div>
      <div id="logoDiv">
          硅谷外卖
      </div>
      <div id="loginTypeDiv" class="clearFix">
          <div :class="{active:$route.path==='/login/msgLogin'}">
              <router-link to="/login/msgLogin" replace>短信登陆</router-link>
          </div>
          <div :class="{active:$route.path==='/login/passworldLogin'}">
              <router-link to="/login/passworldLogin" replace>密码登陆</router-link>
          </div>
      </div>
      <router-view></router-view>
      <div id="loginButton" @click="$bus.$emit('loginCheck')">
          登录
      </div>
      <div id="aboutUs">
          关于我们
      </div> 
      <LoginCheckNotify v-show="alertShow" :showText="alertText" :showButton="alertButtonShow" :closeSelf="closeAlert" class="successNotify"/>  

  </div>
</template>

<script>
import axios from "axios"
import {PORT} from '../../common/const'
import LoginCheckNotify from "../../components/LoginCheckNotify.vue"

export default {
    name:'Login',
    components:{
        LoginCheckNotify
    },
    data:function(){
        return {
            alertText:"",
            alertButtonShow:true,
            alertShow:false,
        }
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
        login(accountType,...params){
            
            if(accountType===1){
                axios.post(`http://127.0.0.1:${PORT}/login_sms`,
                {
                    'phone':params[0],
                    'code':params[1]
                })
                .then(response=>{

                    if(response.data.code!=0){
                        this.showAlert(response.data.msg,true)
                    }
                    else{
                        this.$store.dispatch("loginComplete")
                        this.$store.state.accountType = accountType
                        this.$router.push('/msite')
                    }
                },
                error=>{
                    console.log(error.message)
                })

            }
            else if(accountType===2){
                axios.post(`http://127.0.0.1:${PORT}/login_pwd`,
                {
                    'name':params[0],
                    'pwd':params[1],
                    'captcha':params[2]
                })
                .then(response=>{
                    
                    if(response.data.code!=0){
                        this.showAlert(response.data.msg,true)
                    }
                    else{
                        this.$store.dispatch("loginComplete")
                        this.$store.state.accountType = accountType
                        this.$store.state.accountName = response.data.data.name
                        this.$router.push('/msite')
                    }
                },
                error=>{
                    console.log(error.message)
                })

            }
        }
    },
    mounted(){
        this.$bus.$on("loginCheckOk",this.login)
    },
    beforeDestroy(){  
    }
}
</script>

<style lang="less" scoped>
    @import '../../common/css/style.less';

    #comDiv:extend(.page-height){
    }

    a:-webkit-any-link{
        color:black;
    }

    #backArrow span{
        padding:(6rem/40);
        color:#C4C4C4;
    }

    #logoDiv{
        line-height: (100rem/40);
        text-align: center;
        font-size: (40rem/40);
        font-weight: bold;
        color:@mainBackColor;
    }

    #loginTypeDiv{
        width: @loginDivWidth;
        margin:0 auto;
        display: flex;
        justify-content: space-evenly;
        line-height: (30rem/40);
    }

    #loginTypeDiv div.active{
        color:@mainBackColor;
        border-bottom: (3rem/40) @mainBackColor solid;
    }

    a.router-link-active{
        color:@mainBackColor;
    }

    #loginButton{
        width: @loginDivWidth;
        margin:0 auto;
        line-height: (40rem/40);
        text-align: center;
        background-color: #57EF73;
        border-radius: (5rem/40);
        color:@textColor
    }

    #aboutUs{
        width: @loginDivWidth;
        margin:0 auto;
        text-align: center;
        line-height: (50rem/40);
        font-size: (12rem/40);
        color:grey;
    }

</style>