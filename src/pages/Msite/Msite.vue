<template>
  <div id="comDiv">
      <Header :title="location">

        <template slot="left">
            <router-link to="/search">
                <i class="fas fa-search"></i>
            </router-link>
        </template>

        <template slot="right">
            <router-link to="/login" v-show="!$store.state.isLogin">
                登陆|注册
            </router-link>
        </template>

      </Header>

      <div id="category" class="swiper">
        <div id="container" class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categories,index) in fomatCategories" :key="index">
            <ul>
              <li v-for="categoryItem in categories" :key="categoryItem.id">
                <a href="#">
                    <div class="imgDiv">
                        <img :src="'https://fuss10.elemecdn.com'+categoryItem.image_url" alt="">
                    </div>
                    <span>{{categoryItem.title}}</span>
                </a>
              </li>
            </ul>  
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      
      <div id="nearShop">
        <div id="nearShopTitle">
            <i class="fa fa-stream"></i>
            <span> 附近商家</span>
        </div>
        <NearShopList/>
      </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import axios from 'axios'
import {PORT} from '../../common/const'
import {mapState} from 'vuex'

import Header from '../../components/Header.vue'
import NearShopList from '../../components/NearShopList.vue'

export default {
    name:"Msite",
    components:{
        Header,
        NearShopList,
    },
    data:function(){
        return {}
    },
    computed:{
        ...mapState(["categories","location"]),

        fomatCategories(){
            let outerArray=[]
            let innerArray=[]
            
            this.categories.forEach(c=>{
                if(innerArray.length===8){
                    innerArray=[]
                }

                if(innerArray.length===0){
                    outerArray.push(innerArray)
                }

                innerArray.push(c)
            })

            return outerArray
        }
    },
    watch:{
        
        categories(value){

            this.$nextTick(()=>{

                new Swiper('.swiper',{
                    loop:false,
                    pagination:{
                        el:'.swiper-pagination',
                    }
                })
            })
        }
    },
    methods:{
    },
    mounted(){

        axios.get(`http://127.0.0.1:${PORT}//index_category`)
        .then(response=>{
            this.$store.state.categories=response.data.data
        },error=>{
            console.log("error:",error.message)
        }) 
        
        let {latitude,longitude} = this.$store.state
        let geohash = latitude+","+longitude
        axios.get(`http://127.0.0.1:${PORT}//position/${geohash}`)
        .then(response=>{
            this.$store.state.location=response.data.data.address
        },error=>{
            console.log("error:",error.message)
        }) 

    },
    beforeDestroy(){
    }
}
</script>

<style lang="less" scoped>
    @import '../../common/css/style.less';

    #comDiv:extend(.page-height){
    }

    #category{
		height:(136rem/40);
        border-bottom:(8rem/40) solid #DEE1E6;
    }

    #category #container ul{
        background-color: red;
    }

    #category li{
        width:(@viewWidth/4.01);
        height:(68rem/40);
        float:left;
        box-sizing: border-box;
    }

    #category li a{
        display: block;
        width: (60rem/40);
        height: (62rem/40);
        margin:0 auto;
        font-size: (12rem/40);
        text-align: center;
    }

    #category li a .imgDiv{
        width:(45rem/40);
        height:(45rem/40);
    }

    .imgDiv img{
        width:100%;
    }

    #nearShop{
        margin:(10rem/40);
    }

    #nearShop #nearShopTitle{
        margin-bottom: (10rem/40);
        color: grey;
    }

    a:-webkit-any-link{
        color:white;
    }

    #category a:-webkit-any-link{
        color:black;
    }


</style>