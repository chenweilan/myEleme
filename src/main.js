import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
import './mock/MockServer'

import "./assets/fontawesome/css/all.css"
import 'swiper/dist/css/swiper.css'


Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate(){
    Vue.prototype.$bus=this
  }

}).$mount('#app')
