<template>
  <div>
    <ul></ul>
    <div>
      <div>
        <span>优惠</span>
      </div>
      <ul>
        <li v-for="(item,index) in foods" :key="index">
          {{item.test}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {PORT} from '../../../common/const'

export default {
    name:"OrderEat",
    props:["shopID"],
    data:function(){
      return {
        chooseType:"",
        foods:[]
      }
    },
    mounted(){
      axios.get(`/mockApi/foods`)
      .then(response=>{
        this.foods=response.data.data
      },error=>{})
    }
}
</script>

<style>

</style>