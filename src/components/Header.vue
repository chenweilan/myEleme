<template>
  <div>
      <span id="titleLeft">
        <slot name="left" ></slot>
      </span>

      {{title}}

      <span id="titleRight">
        <slot name="right" ></slot>
      </span>
  </div>
</template>

<script>
export default {
    name:"Header",
    props:['title']
}
</script>

<style lang="less" scoped>
  @import '../common/css/style.less';

  div:extend(.header-height){
    background-color: @mainBackColor;
    color:@textColor;
    font-size: (20rem/40);
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

    #titleLeft,
    #titleRight{
        font-size: (18rem/40);
    }

</style>