<template>
  <div id="comDiv">
      <div id="head" class="clearFix">
          <div id="backImgHead">
          </div> 
          <span id="backArrow" @click="$router.back()" class="fas fa-chevron-left"></span>
          <div id="logoDiv"></div>     
      </div>
      <div id="nameDiv">
        <span>
            <span v-show="headInfo.is_premium">品牌</span>
            {{headInfo.name}}
        </span>
        <span>$ 月销{{headInfo.rating_count}}单 {{headInfo.delivery_mode?headInfo.delivery_mode.text:''}} 约{{headInfo.order_lead_time}}分钟 距离{{headInfo.distance}}</span>
        <span>
            <span v-if="headInfo.supports&&headInfo.supports.length">首单</span>
            <span v-if="headInfo.activities&&headInfo.activities.length">
                {{headInfo.activities[0].description}}
            </span>
        </span>
      </div>
      <ul id="actionNavDiv">
          <li>
              <router-link :to="`/shopDetail/orderEat/${shopID}`" replace>点餐</router-link>
          </li>
          <li>
              <router-link :to="`/shopDetail/evaluate/${shopID}`" replace>评价</router-link>
          </li>
          <li>
              <router-link :to="`/shopDetail/shopInfo/${shopID}`" replace>商家</router-link>
          </li>
      </ul>
      <router-view ></router-view>
  </div>
</template>

<script>
import axios from 'axios'
import {PORT} from '../../common/const'

export default {

    name:'ShopDetail',
    data:function(){
        return {
            headInfo:{}
        }
    },
    props:["shopID"],
    mounted(){
        // axios.get("/fakeApi/getShopHeadInfo")
        // .then(response=>{
        //     this.headInfo = response.data.data
        // },error=>{})
        
        let i=0
        for( i in this.$store.state.nearShopList){
            let shopInfo = this.$store.state.nearShopList[i]
            if(shopInfo.id===this.shopID){
                this.headInfo=shopInfo
                break
            }
        }
    }
}
</script>

<style lang="less" scoped>
    @import '../../common/css/style.less';

    @greenColor:rgb(65, 207, 65);

    #comDiv:extend(.page-height){
    }

    #head{
        position: relative;

        #backImgHead:extend(.header-height){
            background-color: pink;
            margin-bottom: (30rem/40);
        }

        #backArrow{
            position:absolute;
            top:(16rem/40);
            left:(10rem/40);
            color:#C4C4C4;
        }

        #logoDiv{
            width:(30rem/40);
            height: $width;
            border:(13rem/40) solid white;
            background-color: red;
            position:absolute;
            left:(155rem/40);
            top:(8rem/40);
        }
    }

    #nameDiv{
        display: flex;
        height: (90rem/40);
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        font-size: (20rem/40);

        span{
            &:first-child{
                vertical-align: middle;
                span{
                    font-size: (12rem/40);
                    background-color: yellow;
                    padding: 0 (6rem/40);
                }
            }
            &:nth-child(2){
                font-size: (12rem/40);
            }
            &:nth-child(3){
                font-size: (12rem/40);
                vertical-align: middle;
                span{
                    &:first-child{
                        background-color: rgb(66, 207, 66);
                        padding: 0 (6rem/40);
                        color:white;
                    }
                }
            }
        }
    }

    #actionNavDiv{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        font-size: (14rem/40);
        li{
            height: (25rem/40);
            a{
                display: block;
                height: (25rem/40);
                &:-webkit-any-link{
                    color:black;
                }
                &.router-link-active{
                 color: @greenColor;
                 border-bottom:3px @greenColor solid;
                }
            }
        }
    }

    

</style>