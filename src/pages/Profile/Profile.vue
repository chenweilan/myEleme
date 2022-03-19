<template>
  <div id="comDiv">
      <Header title="我的"/>
      <div id="avatarDiv">
          <div id="avatarImgDiv"></div>
          <div class="bindStateDiv" v-show="!$store.state.isLogin">
            <div id="loginButton">
                <router-link to="/login">
                    <span>登陆/注册</span>
                </router-link>
            </div>
            <div>
                <i class="fas fa-mobile-alt"></i>
                暂无绑定手机号
            </div>
          </div>
          <div class="bindStateDiv" v-show="$store.state.isLogin&&$store.state.accountType===1">
            <div>
                <i class="fas fa-mobile-alt"></i>
                18682013676
            </div>
          </div>
          <div class="bindStateDiv" v-show="$store.state.isLogin&&$store.state.accountType===2">
            <div>
                {{$store.state.accountName}}
            </div>
            <div>
                <i class="fas fa-mobile-alt"></i>
                暂无绑定手机号
            </div>
          </div>
      </div>

      <div id="restMoney" class="clearFix">
          <div id="money">
              <div><span>0.00</span>元</div>
              <div>我的余额</div>
          </div>
          <div id="card">   
              <div><span>0</span>个</div>
              <div>我的优惠</div>
          </div>
          <div id="score">
              <div><span>0</span>分</div>
              <div>我的积分</div>
          </div>
      </div>

      <div id="infoList">
          <div id="myOrder">
            <i class="fas fa-calendar-minus"></i>
            我的订单
          </div>

          <div id="scoreCity">
              <i class="fas fa-info-circle"></i>
              积分商城
          </div>

          <div id="vip">
              <i class="fas fa-award"></i>
              硅谷外卖会员卡
          </div>

          <div id="serviceCenter">
              <i class="fas fa-city"></i>
              服务中心
          </div>
      </div>
      
      <div id="logoutButton" v-show="$store.state.isLogin">
        <span @click="logout">退出登陆</span>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import {PORT} from '../../common/const'

import Header from '../../components/Header.vue'

export default {
    name:"Profile",
    components:{
        Header
        },
    methods:{
        logout(){
            axios.get(`http://127.0.0.1:${PORT}/logout`)
            .then(response=>{
                if(response.data.code===0){
                    this.$store.state.isLogin=false
                }
            },error=>{
                console.log("error:",error.message)
            })
        }
    }
}
</script>

<style lang="less" scoped>
    @import '../../common/css/style.less';

    #comDiv:extend(.page-height){
        background-color: #F5F5F5;
    }

    #avatarDiv{
        border-top:3px solid #86E2C3;
        background-color: @mainBackColor;
        color:@textColor;
        height: (70rem/40);
        padding-top:(18rem/40);
    }

    #avatarDiv>div{
        float: left;
    }

    #avatarDiv #avatarImgDiv{
        width:(60rem/40);
        height: (60rem/40);
        background-color: #7F8C8E;
        margin:0 (10rem/40);
        border-radius: 50%;
    }

    #avatarDiv .bindStateDiv{
        height: (60rem/40);
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        font-size: (14rem/40);
    }

    #avatarDiv .bindStateDiv #loginButton{
        font-size: (18rem/40);
        font-weight: bold;
    }

    #restMoney{
        font-size:(13rem/40);
        width:@viewWidth;
    }

    #restMoney span{
        font-size:(22rem/40);
        font-weight: bold;
    }

    #restMoney>div{
        float:left;
        height: (70rem/40);
        width:(@viewWidth/3.01);
        text-align: center;
        background-color: white;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }

    #restMoney>div:nth-child(2){
        margin-left:(1rem/40);
    }

    #myOrder,
    #scoreCity,
    #vip,
    #serviceCenter{
        margin:(10rem/40) 0;
        padding:0 (10rem/40);
        background-color: white;
        line-height: (50rem/40);
    }

    #logoutButton{
        width:@viewWidth;
        text-align: center;
        background-color: #E13E51;
        line-height: (30rem/40);
        color:@textColor;
        border-radius: (3rem/40);
        font-weight: bold;
    }

    a:-webkit-any-link{
        color:white;
    }


</style>