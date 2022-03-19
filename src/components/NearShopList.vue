<template>
  <div id="nearShopsDiv">
    <ShopList :shops="nearShopList"/>
  </div>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'
import {PORT} from '../common/const'
import ShopList from './ShopList'

export default {
    name:'NearShopList',
    data:function(){
      return {}
    },
    computed:{
      ...mapState(['nearShopList'])
    },
    components:{
      ShopList
    },
    mounted(){

        let {latitude,longitude} = this.$store.state
        axios.get(`http://127.0.0.1:${PORT}/shops?latitude=${latitude}&longitude=${longitude}`)
        .then(response=>{
            this.$store.state.nearShopList=response.data.data
        },error=>{
            console.log("error:",error.message)
        }) 

    }

}
</script>

<style lang='less' scoped>
    @import '../common/css/style.less';

    #nearShopsDiv{
      height: (375rem/40);
      overflow: scroll;
    }
</style>