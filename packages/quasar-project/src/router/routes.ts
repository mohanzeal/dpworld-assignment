import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
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
    name: "ImagesList",
    path: "/images-list",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("components/ImagesList.vue") },
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
