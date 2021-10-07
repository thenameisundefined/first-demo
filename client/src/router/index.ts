import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Register from '../views/register.vue'
import Page404 from '../views/404.vue'
import index from '../views/index.vue'
import login from '../views/login.vue'
import Info from "../components/Info.vue"
import Profile from "../components/profile.vue"
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
  ,
  {
    path: '/index',
    name: 'index',
    component: index,
    children:[
      {
        path: '/info',
        name: 'info',
        component: Info
      },
      {
        path: '/profile',
        name: 'profile',
        component: Profile
      }
    ]
  }
  ,
  {
    path:'/login',
    name: 'login',
    component: login
  }
  ,
  {
    path:'/',
    name: 'login',
    component: login
  }
  ,
  {
    path: '*',
    name: 'Page404',
    component: Page404
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to,from,next)=>{
  const isLogin = localStorage.eltoken ? true : false;
  if(to.path === '/login' || to.path === '/register') {
    next();
  } else {
    isLogin ? next() : next('/login');
  }
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}
export default router
