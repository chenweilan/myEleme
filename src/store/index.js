import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

let state ={
    port:8080,
    accountName:"",
    isLogin:false,
    accountType:2,
    isLoging:false,
    latitude:'40.10038',
    longitude:'116.36867',
    location:"",
    categories:[],
    nearShopList:[],
    searchShopList:[],
}

let actions={
    login(context){
        context.commit("SET_ISLOGING", true)
    },

    loginComplete(context){
        context.commit("SET_ISLOGIN", true)
        context.commit("SET_ISLOGING", false)
    },

    logout(context){
        context.commit("SET_ISLOGIN", false)
    }
}
let mutations={
    SET_ISLOGING(state,value){
        state.isloging=value
    },
    SET_ISLOGIN(state,value){
        state.isLogin=value
    }
}
let getters={}

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})