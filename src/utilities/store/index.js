import { createStore } from "vuex";
import sampleStore from "./modules/sampleStore";
// import { createWebHistory, createRouter } from "vue-router";
// import Home from "@/views/Home.vue";
// import About from "@/views/About.vue";

// const routes = [
//   // {
//   //   path: "/",
//   //   name: "Home",
//   //   component: Home,
//   // },
//   {
//     path: "/about",
//     name: "About",
//     component: About,
//   },
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });



export default createStore({
  modules: {
    sampleStore,
  },
  // router
});
