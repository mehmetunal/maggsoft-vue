import { createWebHistory, createRouter } from "vue-router";
import store from "./store";
const routes = [
  {
    path: "/",
    component: () => import("./components/Layout.vue"),
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("./views/Home.vue"),
      },
    ],
    meta: {
      aut: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("./views/aut/Login.vue"),
  },
  {
    path: "/400",
    component: () => import("./views/error/page-error-400.vue"),
  },
  {
    path: "/403",
    component: () => import("./views/error/page-error-403.vue"),
  },
  {
    path: "/404",
    component: () => import("./views/error/page-error-404.vue"),
  },
  {
    path: "/500",
    component: () => import("./views/error/page-error-500.vue"),
  },
  {
    path: "/503",
    component: () => import("./views/error/page-error-503.vue"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: '/404',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  let state = store.state;
  if (state.isLogin()) {
    next();
  } else if (to.matched.some((record) => record.meta.aut)) {
    next({ path: "login" });
  } else {
    next();
  }
});

export default router;
