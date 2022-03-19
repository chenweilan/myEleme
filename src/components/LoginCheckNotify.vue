<template>
  <div id="notifyDiv">
      <span>{{showText}}</span>
      <button v-show="showButton" @click="closeSelf()">确定</button>
  </div>
</template>

<script>
export default {
    name:"LoginCheckNotify",
    props:["showText","showButton","closeSelf"]
}
</script>

<style lang="less" scoped>
    @import '../common/css/style.less';

    #notifyDiv{
        width:(200rem/40);
        height: (100rem/40);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        background-color: @mainBackColor;
        border-radius: (10rem/40);
        color:@textColor;
        position: absolute;
        left:(90rem/40);
        top:(200rem/40);
    }

    #notifyDiv button{
        width:(100rem/40);
    }
</style>