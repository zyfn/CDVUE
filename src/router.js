import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
// import Hot from './views/hot/Hot.vue'
import Question from './views/question/Question.vue'
import Base from './views/base/Base.vue'
import BaseTitleList from './views/base/BaseTitleList.vue'
import BaseSimContent from './views/base/BaseSimContent.vue'
import BaseContent from './views/base/BaseContent.vue'
import ThreeManager from './views/threeManager/ThreeManager.vue'
import Err from './components/404.vue'
import Login from './components/Login.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: '',
      redirect:'/home'
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        isLogin: false
      },
      component: Login
    },
    {
      name:'hotDetail',
      path:'/hotDetail',
      component:resolve => { require(['@/views//hot/HotDetail'], resolve) }
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      redirect:'/home/hot',
      children:[
        {
          path: 'hot',
          name: 'hot',
          component: resolve => { require(['@/views/hot/Hot'], resolve) }
        },
        {
          path: 'base',
          name: 'base',
          component: Base,
          redirect:'/home/base/baseSimContent',
          children:[{
            path: 'baseTitleList/:id',
            name: 'baseTitleList',
            component: BaseTitleList,
          },
          {
            path: 'baseSimContent',
            name: 'baseSimContent',
            component: BaseSimContent,
          },]
        },
        {
          path: 'threeManager',
          name: 'threeManager',
          meta: {
            isLogin: true
          },
          component: ThreeManager,
        },
        {
          path: 'question',
          name: 'question',
          meta: {
            isLogin: true
          },
          component: Question,
        },
        {
          path: 'baseContent',
          name: 'baseContent',
          component: BaseContent,
          afterEach:(to,from,next)=>{
            if(to.path===from.path){
              console.log(to+' 这是to')
            }
            console.log(to)
            console.log(from)
            next();
          }
        },
        {
          path: '*',
          name: '404',
          component: Err,
        },
      ]
    },
    {
      path: '*',
      name: '404',
      component: Err,
    }
  ],
})
