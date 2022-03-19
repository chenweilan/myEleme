<template>
    <div>
        <ul id="shopListDiv">
          <li v-for="(shop,index) in shops" :key="index">
            <router-link :to="{
              name:'shopDetail',
              params:{shopID:shop.id}
            }">
              <div class="imgDiv">
                <img :src="'http://cangdu.org:8001/img/'+shop.image_path" alt="">
              </div>
              <div class="shopInfoDiv">
                <span class="nameSpan">
                  {{shop.name}}
                </span>
                <span class="starSpan">
                  <span>{{shop.rating}}</span>
                  <span>月销{{shop.rating_count}}单</span>
                  <span>{{Math.floor(shop.rating)}}星{{shop.rating-Math.floor(shop.rating)>=0.5?"半":""}}</span>
                </span>
                <span class="deliveryFeeSpan">
                  ￥{{shop.float_minimum_order_amount}}元起送/配送费约￥{{shop.float_delivery_fee}}
                </span>
              </div>
              <div class="tagDiv">
                <div>
                  <span v-for="(item,index) in shop.supports" :key="index">
                    {{item.icon_name}}
                  </span>
                </div>
                <div>{{shop.delivery_mode?shop.delivery_mode.text:''}}</div>
                <div></div>
              </div>
            </router-link>
          </li>
        </ul>
    </div>
</template>

<script>
export default {
    name:"ShopList",
    props:["shops"]
}
</script>

<style lang='less' scoped>
    @import '../common/css/style.less';
    
    #shopListDiv{
        li{
            margin-bottom: (10rem/40);
            a{
                display: flex;
                justify-content: space-evenly;
                &:-webkit-any-link{
                    color:black;
                }
            }
            .imgDiv{
                width:(70rem/40);
                height: $width;
            }
            .shopInfoDiv{
                height: (70rem/40);
                width: (200rem/40);
                font-size: (14rem/40);
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .starSpan{
                    font-size: (12rem/40);
                    span{
                        margin-right: (8rem/40);
                        &:first-child,
                        &:nth-child(3){
                            color:orange;
                        }
                    }

                }
                .deliveryFeeSpan{
                    font-size: (13rem/40);
                }

            }
            .tagDiv{
                font-size: (12rem/40);
                width:(60rem/40);
                height: (60rem/40);
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;

                >div{
                    height: (40rem/40);

                    &:nth-child(2){
                        color:@mainBackColor
                    }
                }
            }
            img{
                width:100%;
            }

        }

    } 
</style>