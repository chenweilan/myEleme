<template>
  <div id="comDiv">
      <Header title="搜索"/>
      <div id="searchDiv">
        <div id="input">
            <input type="text" placeholder="请输入商家名称" v-model="keyWorld">
        </div>
        <div id="submit">
            <button @click="search">提交</button>
        </div>
      </div>
      
      <div id="shopListDiv">
        <ShopList :shops="searchShopList"/>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'
import {PORT} from '../../common/const'
import Header from '../../components/Header.vue'
import ShopList from '../../components/ShopList'

export default {
    name:"Search",
    components:{
        Header,
        ShopList
        },
    data:function(){
        return {
            keyWorld:""
        }
    },
    computed:{
        ...mapState(['searchShopList'])
    },
    methods:{
        search(){
            let {latitude,longitude} = this.$store.state
            let geohash = latitude+","+longitude
            axios.get(`http://127.0.0.1:${PORT}/search_shops?keyword=${this.keyWorld}&geohash=${geohash}`)
            .then(response=>{
                this.$store.state.searchShopList=response.data.data
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
    }

    #searchDiv{
        height: (50rem/40);
    }

    #input,
    #submit{
        float: left;
    }

    #input{
        margin-left: (6rem/40);
        margin-top:(10rem/40);
    }

    #submit{
        margin:(10rem/40) (6rem/40);
    }

    #input input{
        width:(280rem/40);
        font-size: (13rem/40);
        padding:(7rem/40);
        border:none;
        background-color: #F2F2F2;
    }

    #submit button{
        background-color: @mainBackColor;
        border:none;
        color:@textColor;
        width:(60rem/40);
        height: (30rem/40);
    }

    #comDiv #shopListDiv{
        height: (510rem/40);
        overflow: scroll;
    }
</style>