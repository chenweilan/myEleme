<template>
    <ul v-show="$route.meta.showFooter">
      <li @click="goto('/msite')" :class="{active:$route.path==='/msite'||$route.path==='/'}">
        <i class="fas fa-magnet"></i>
        <span>主页</span>
      </li>
      <li @click="goto('/search')" :class="{active:$route.path==='/search'}">
        <i class="fas fa-search"></i>
        <span>搜索</span>
      </li>
      <li @click="goto('/order')" :class="{active:$route.path==='/order'}">
        <i class="fas fa-clipboard"></i>
        <span>订单</span>
      </li>
      <li  @click="goto('/profile')" :class="{active:$route.path==='/profile'}">
        <i class="fas fa-portrait"></i>
        <span>我的</span>
      </li>
  </ul>
</template>

<script>
export default {
    name:"FooterGuide",
    methods:{
        goto(path){
            this.$router.replace(path)
        }
    }
}
</script>

<style lang="less" scoped>
    @import '../common/css/style.less';

    ul:extend(.footer-height){
        margin: 0;
        padding: 0;
        list-style: none;
        display: flex;
        justify-content: space-around;
    }

    li{
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        padding:0 (30rem/40);
    }

    i{
        font-size: (20rem/40);
    }

    .active{
        color:@mainBackColor;
    }
</style>