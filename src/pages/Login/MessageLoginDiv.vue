<template>
  <div id="msgLoginDiv" class="clearFix">
    <div id="telephoneNumbDiv">
      <input type="text" v-model="phone" maxlength="11">
      <button @click="getCode" :disabled="!rightPhone">
          {{computeTime>0?`已发送(${computeTime}s)`:'获取验证码'}}
      </button>
    </div>
    <div id="checkCodeDiv">
        <input type="text" v-model="checkCode" placeholder="验证码" maxlength="6">
    </div>
    <div id="friendlyTip">
        温馨提示：未注册硅谷外卖的手机号，登录时将自动注册，
        且代表已同意<span @click="$router.push('/agreement')">《用户服务协议》</span>
    </div>

    <LoginCheckNotify v-show="alertShow" :showText="alertText" :showButton="alertButtonShow" :closeSelf="closeAlert" class="successNotify"/>  
      
  </div>
</template>

<script>
import axios from "axios"
import {PORT} from '../../common/const'

import LoginCheckNotify from "../../components/LoginCheckNotify.vue"

export default {
    name:'MessageLoginDiv',
    data:function(){
        return {
            computeTime:0,
            phone:'',
            checkCode:"",
            alertText:"",
            alertButtonShow:true,
            alertShow:false
        }
    },
    computed:{
        rightPhone(){
            return /^1\d{10}$/.test(this.phone)
        }
    },
    components:{
        LoginCheckNotify
    },
    methods:{
        getCode(){
            if(this.computeTime===0){
                this.computeTime=30
                this.intervalTimer = setInterval(() => {
                    this.computeTime--
                    if(this.computeTime<=0){
                        clearInterval(this.intervalTimer)
                    }
                }, 1000);

                axios.get(`http://127.0.0.1:${PORT}/sendcode?phone=${this.phone}`)
                .then(response=>{
                    if(response.data.code===0){
                        this.showAlert("发送成功！",true)
                    }
                    else{
                        this.showAlert(response.data.msg,true)
                    }
                    
                },error=>{})
            }    
        },
        showAlert(text,showBtn){
            this.alertText=text
            this.alertShow=true
            this.alertButtonShow=showBtn
        },
        closeAlert(){
            this.alertShow=false
        },
        loginCheck(){
            if(!this.phone){
                this.showAlert("请填写手机号!",true)
                return
            }else if(!this.checkCode){
                this.showAlert("请填写校验码!",true)
                return
            }
            this.loginTimer = setTimeout(() => {
                this.$bus.$emit("loginCheckOk",1,this.phone,this.checkCode)
            }, 2000);
        }
    },
    mounted(){
        this.$bus.$on("loginCheck",this.loginCheck)
    },
    beforeDestroy(){
        this.$bus.$off('loginCheck')
        clearInterval(this.intervalTimer)
        clearInterval(this.loginTimer)
    }
}
</script>

<style lang="less" scoped>
    @import '../../common/css/style.less';

    #msgLoginDiv{
        margin-bottom: (10rem/40);
    }

    #msgLoginDiv input{
        margin:0;
        padding:0;
        line-height: (40rem/40);
        border:none;
        border-radius: (4rem/40);
        padding-left:6px;
    }

    #msgLoginDiv #telephoneNumbDiv,
    #msgLoginDiv #checkCodeDiv,
    #msgLoginDiv #friendlyTip{
        width:@loginDivWidth;
        margin:(10rem/40) auto;
        border:1px solid grey;
        height: (40rem/40);
        border-radius: (4rem/40);
    }

    #msgLoginDiv #telephoneNumbDiv input{
        float:left;
        width:(210rem/40);
    }

    #msgLoginDiv #telephoneNumbDiv button{
        float:right;
        margin-right: (5rem/40);
        // margin-top:(8rem/40);
        height: (40rem/40);
        width:(95rem/40);
        border:none;
        background-color: white;
    }

    #msgLoginDiv #checkCodeDiv input{
        width:@loginInputWidth;
    }

    #msgLoginDiv #friendlyTip{
        font-size: (13rem/40);
        color:grey;
        border:none;
    }

    #friendlyTip span{
        color:@mainBackColor;
        font-weight: bold;
    }


</style>