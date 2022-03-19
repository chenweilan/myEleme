
import VueRouter from 'vue-router'
import Msite from '../pages/Msite/Msite'
import Search from '../pages/Search/Search'
import Order from '../pages/Order/Order'
import Profile from '../pages/Profile/Profile'
import Login from '../pages/Login/Login'
import ShopDetail from '../pages/ShopDetail/ShopDetail'
import MessageLoginDiv from '../pages/Login/MessageLoginDiv'
import PassworldLoginDiv from '../pages/Login/PassworldLoginDiv'
import Agreement from '../pages/Agreement/Agreement'
import OrderEat from '../pages/ShopDetail/OrderEat/OrderEat'
import Evaluate from '../pages/ShopDetail/Evaluate/Evaluate'
import ShopInfo from '../pages/ShopDetail/ShopInfo/ShopInfo'

//使用编程式导航的情况下连续点击跳转按钮会报错，这是VueRouter内部实现的问题（replace、push方法需要传三个参数，否则报错），
//这里对其进行重写，使其在传一个参数的情况下不报错
let originReplace=VueRouter.prototype.replace
VueRouter.prototype.replace=function(path,resolve,reject){
    if(resolve&&reject){
        originReplace.call(this,path,resolve,reject)
    }
    else{
        originReplace.call(this,path,()=>{},()=>{})
    }
}

export default new VueRouter({
    routes:[
        {
            path:"/",
            redirect:"/msite"
        },
        {
            path:"/msite",
            component:Msite,
            meta:{showFooter:true}
        },
        {
            path:"/search",
            component:Search,
            meta:{showFooter:true}
        },
        {
            path:"/order",
            component:Order,
            meta:{showFooter:true}
        },
        {
            path:"/profile",
            component:Profile,
            meta:{showFooter:true}
        },
        {
            path:"/login",
            component:Login,
            redirect:"/login/msgLogin",
            children:[
                {
                    path:"msgLogin",
                    component:MessageLoginDiv
                },
                {
                    path:"passworldLogin",
                    component:PassworldLoginDiv
                },
                // {
                //     path:"",
                //     redirect:"/login/msgLogin",
                // }
            ]
        },
        {
            name:'shopDetail',
            path:"/shopDetail",
            component:ShopDetail,
            redirect:"/shopDetail/orderEat/:shopID",        //如果时用name跳转的，重定向方式必须使用这种，而不能使用配置默认子路由的方式
            props($route){
                return { shopID: Number($route.params.shopID)}
            },
            children:[
                {
                    path:"orderEat/:shopID",
                    component:OrderEat,
                    props($route){
                        return { shopID: Number($route.params.shopID)}
                    },
                },
                {
                    path:"evaluate/:shopID",
                    component:Evaluate,
                    props($route){
                        return { shopID: Number($route.params.shopID)}
                    },
                },
                {
                    path:"shopInfo/:shopID",
                    component:ShopInfo,
                    props($route){
                        return { shopID: Number($route.params.shopID)}
                    },
                }
            ]
        },
        {
            path:"/agreement",
            component:Agreement
        }
    ]
})