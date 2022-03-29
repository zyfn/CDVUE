import Vue from 'vue'
import router from './router'
import store from './store'
router.beforeEach((to, from, next) => {
  //如果登录标志存在且为isLogin，即用户已登录
  if(store.getters.isLoggedIn){
    //设置vuex登录状态为已登录
    next()
  //如果登录标志不存在，即未登录
  }else{
    if(sessionStorage.getItem("user")){
      let user = JSON.parse(sessionStorage.getItem("user"));
      store.state.user=user;
      next()
    }
    //用户想进入需要登录的页面，则定向回登录界面
    else if(to.meta.isLogin){
      var r = window.confirm("请先登录");
      if(r){
        next({
          path: '/login',
        })
      }
      else{
        next({
          path: `${from.path}`,
        })
      }
    }else{
      next()
    }

  }

});

router.afterEach(route => {
  window.scroll(0, 0);
});
export  default router