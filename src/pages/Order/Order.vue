<template>
  <div id="comDiv">
      <Header title="订单列表"/>
      <div id="unloginShow" v-show="!$store.state.isLogin">
          <div>登录后查看外卖订单</div>
          <div>
              <button @click="$router.push('/login')">立即登陆</button>
          </div>
      </div>
      <div id="loginShow" v-show="$store.state.isLogin">
          order
      </div>
  </div>
</template>

<script>
import Header from '../../components/Header.vue'

export default {
    name:"Order",
    components:{
        Header
        }
}
</script>

<style lang="less" scoped>
    @import '../../common/css/style.less';

    #comDiv:extend(.page-height){
    }

    #unloginShow{
        font-size: (14rem/40);
        text-align: center;
        padding-top:(250rem/40);
        font-size: (13rem/40);
    }

    #unloginShow button{
        width:(90rem/40);
        height:(30rem/40);
        margin-top:(10rem/40);
        background-color: @mainBackColor;
        border:none;
        color:@textColor;
        font-size: (12rem/40);
    }
</style>