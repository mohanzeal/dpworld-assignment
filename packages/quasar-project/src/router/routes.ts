import { RouteRecordRaw } from "vue-router";
import requireAuth from "./middleware/requireAuth";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    meta: {
      middleware: [requireAuth],
    },
    children: [
      {
        name: "HomePage",
        path: "",
        component: () => import("pages/HomePage.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        name: "LoginPage",
        path: "",
        component: () => import("pages/LoginPage.vue"),
      },
    ],
  },
  {
    path: "/images-list",
    meta: {
      middleware: [requireAuth],
    },
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        name: "ImagesList",
        path: "",
        component: () => import("components/ImagesList.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
