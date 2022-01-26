import { createWebHistory, createRouter } from "vue-router";

import Layout from "./components/Layout.vue";

const routes = [
  {
    path: "/",
    name: "Home",
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
