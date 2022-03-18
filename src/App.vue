<template>
  <div id="app">
    <keep-alive include="Search">
      <router-view/>  
    </keep-alive>
    
    <FooterGuide/>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide.vue'

export default {
  name: 'App',
  components: {
    FooterGuide
  }
}
</script>

<style lang="less">
  @import './common/css/style.less';
  
  html{
    font-size: (100vw/375*40);  //10.67vw
  }
  
  body{
    margin:0;
  }

  ul{
    list-style: none;
    margin:0;
    padding:0;
  }

  a{
    text-decoration: none;
  }

  #app{
    font-size: (16rem/40);
  }
</style>
