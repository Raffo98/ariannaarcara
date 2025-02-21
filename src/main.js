import { createApp } from "vue";
import App from "./App.vue";

// Plugins
import globalVariables from "./plugins/globalVariables";
import { createPinia } from 'pinia';
// import { createWebHistory, createRouter } from "vue-router";
import { createWebHashHistory, createRouter } from "vue-router";


// import router from '/src/utilities/store/index.js';


import i18n from "./utilities/language";

// import { VueSvgIconPlugin } from '@yzfe/vue3-svgicon'
import '@yzfe/svgicon/lib/svgicon.css';
import VueGoogleMaps from '@fawmi/vue-google-maps';


import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Product from "@/views/Product.vue";
import Gallery from "@/views/Gallery.vue";
import CV from "@/views/cv.vue";





const routes = [
  // {
  //   path: '/',
  //   redirect: { name: 'home' }
  // },
  {
    path: "/",
    name: "home",
    component: Home,
    alias: ''
  },
  {
    path: "/product/:id",
    name: "product",
    component: Product

  },
  {
    path: "/gallery/:filter",
    name: "gallery",
    component: Gallery

  },
  {
    path: "/cv",
    name: "cv",
    component: CV

  },
  {
    path: "/about",
    name: "about",
    component: About

  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Se c'è una posizione salvata (quando si preme il pulsante "Indietro" del browser)
    if (savedPosition) {
      return savedPosition;
    } else {
      // Altrimenti, scrolla in cima alla pagina
      return { top: 0 };
    }
  }
});



// const app = createApp(App).use(VueSvgIconPlugin, { tagName: 'icon' });
const app = createApp(App);
const pinia = createPinia();


app.use(globalVariables);
app.use(i18n);
app.use(pinia);
app.use(router);
app.use(VueGoogleMaps, {
  load: {
    key: 'YOUR_API_KEY_COMES_HERE',
  }
});


// Add mount in DOMContentLoaded listener to be sure JS is executed first before prerendering
document.addEventListener("DOMContentLoaded", function () {
  app.mount("#app");
});


