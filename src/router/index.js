import Vue from "vue";
import Router from "vue-router";
import Home from "../components/pages/home/Home";
import Login from "../components/pages/login/Login";
import Register from "../components/pages/register/Register";
import ChangePassword from "../components/pages/changePassword/ChangePassword";
import Todo from "../components/pages/todo/Todo";
import Admin from "../components/pages/admin/Admin";
import DetailUser from "../components/pages/admin/DetailUser";
import Detail from "../components/pages/todo/Detail";
import Error from "../components/pages/error/Error";
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
        isLogin: true
      }
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/change-password",
      name: "ChangePassword",
      component: ChangePassword
    },
    { path: "/to-do", name: "Todo", component: Todo },
    { path: "/admin", name: "Admin", component: Admin },
    {
      path: "/admin/:email-user:_id.html",
      name: "DetailUser",
      component: DetailUser
    },
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
      path: "/error",
      name: "Error",
      component: Error
    },
    {
      path: "/to-do/:title-post:_id.html",
      name: "Detail",
      component: Detail
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.isLogin)) {
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
router.beforeEach((to, from, next) => {
  if (to.name == "Todo" && !Vue.$cookies.get("token")) {
    alert("hãy đăng nhập để sử dụng chức năng này");
    next({
      path: "/login",
      query: {}
    });
  } else {
    next();
  }
});
// router.beforeEach((to, from, next) => {
//   if (to.name == "Admin" && Vue.$cookies.get("type") !== "1") {
//     next({
//       path: "/error",
//       query: {}
//     });
//   } else {
//     next();
//   }
// });

export default router;
