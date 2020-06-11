import Vue from "vue";
import Router from "vue-router";
import Home from "../components/pages/home/Home";
import Login from "../components/pages/login/Login";
import Todo from "../components/pages/todo/Todo";
import Admin from "../components/pages/admin/Admin";
import Detail from "../components/pages/todo/Detail"
Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        isLogin: true,
        us: 'nam'
      }
    },
    { path: "/to-do", name: "Todo", component: Todo },
    { path: "/admin", name: "admin", component: Admin },
    {
      path: "/about",
      name: "About",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(
          /* webpackChunkName: "about" */ "../components/pages/about/About.vue"
        )
    },
    {
      path:"/to-do/:title-post:id.html",
      name:"Detail",
      component:Detail,
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.isLogin)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    console.log("object", Vue.$cookies.get("token"));
    console.log(to.matched.meta.us);
    if (Vue.$cookies.get("token")) {
      next({
        path: "/",
        query: {}
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});
export default router;
