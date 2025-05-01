import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import BV from "../views/BV.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/detect",
    name: "detect",
    component: BV,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
