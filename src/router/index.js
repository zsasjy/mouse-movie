import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
Vue.use(VueRouter)

const router = new VueRouter({
    mode:'history',
    routes
})
router.beforeEach((to,from,next)=>{
    if(to.path === '/' || to.path === '/home'){
        // next({path:'/home'})
        next({path:'/movie/comingsoon'})
    }else if(to.path === '/movie'){
        next({path:'/movie/comingsoon'})
    }
    next();
})
// router.afterEach((to,from,next)=>{

// })

export default router