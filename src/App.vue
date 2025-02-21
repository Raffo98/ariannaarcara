<template>
  <div :class="[$tvaMq]" :version="version.version">
    <Header class="header" :sections="$tm('header.sections')" @set-lang="setLanguage" />
    <div class="breadcrumbs">
    </div>
    <div class="container" v-if="dataReady">
      <router-view :content="$tm(`${path}`)" :data="filteredData" :img="ImageDb" :sections="$tm('header')"></router-view>
    </div>
    <Footer :content="$tm('footer')" />
  </div>
</template>

<script setup>
import version from "@/../package.json";
import { onMounted, provide, ref, watch } from "@vue/runtime-core";
import useTvaMq from "./plugins/tvaMq.js";
import { useI18n } from "vue-i18n";
import { useStateStore } from "@/utilities/store/store";
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import airtable from "@/plugins/airtable.js";

import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";

const { $tvaMq } = useTvaMq();
const i18n = useI18n();
const route = useRoute();

//breadcrumbs
const pathList = ref([]);

function updateBreadcrumbs(path) {
  pathList.value.push(path);
}

const path = computed(() => {
  if (!pathList.value.includes(route.name)) {
    updateBreadcrumbs(route.name);
  }
  else {
    pathList.value.slice(0, pathList.value.indexOf(route.name))
  }
  return route.name;
})

const dataReady = ref(false);

provide("$tvaMq", $tvaMq);
provide("version", version);

const stateModal = useStateStore();

const isMobile = ref('');

// Calling this here is equivalent to calling it in
// beforeCreated / create in Options API
// const instanceAttrs = getCurrentInstance().attrs;
setLanguage();

const productDb = ref([]);
const ImageDb = ref([]);


const filteredData = computed(() => {
  return productDb.value.filter(item => item.lang === i18n.locale.value);
});

const fetchProductData = async () => {
  return new Promise((resolve, reject) => {
    airtable.base('productbase').select({}).eachPage(
      (records, fetchNextPage) => {
        records.forEach(async (record) => {
          productDb.value.unshift({
            id: record.id,
            title: record.fields.title,
            category: record.fields.category,
            code: record.fields.code,
            lang: record.fields.lang,
            img: record.fields.image?.[0]?.url || '', // Usa optional chaining
            gallery: record.fields.gallery || [], // Default a un array vuoto
            order: record.fields.order,
            product: {
              price: [record.fields.max_price, record.fields.min_price],
              accordions: [
                { description: record.fields.description },
                { details: record.fields.details },
                { exhibitions: record.fields.exhibitions },
                { info: record.fields.info }
              ]

            }

          });

        });

        productDb.value.sort((a, b) => a.order - b.order);
        fetchNextPage();
      },
      (err) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        else {
          ImageDb.value = createImgArray();
          resolve();
        }
      }
    );
  });
};


const createImgArray = () => {
  return productDb.value
    .filter(product => product.img) // Esclude gli oggetti senza img
    .map(product => ({
      img: product.img,
      gallery: product.gallery,
      order: product.order,
      code: product.code
    }));
}



const fetchData = async () => {
  try {
    await fetchProductData();

    dataReady.value = true;
  } catch (error) {
    console.error(error);
  }
};

fetchData();

function logScroll() {
  stateModal.updateScroll(window.scrollY);
}


onMounted(() => {
  setVHProperty();
  window.addEventListener("resize", setVHProperty);
  window.addEventListener("orientationchange", setVHProperty);
  const body = document.body;
  if (body) {
    window.addEventListener('scroll', logScroll)
  }
});



watch($tvaMq, () => {
  if ($tvaMq.value === "mobile") isMobile.value = $tvaMq.value;
  else {
    isMobile.value = '';
  }

}
);


function setLanguage(value) {
  const defaultLang = "it";
  let lang;
  const routerLang = null;
  let langFromOutside =
    value ||
    routerLang ||
    process.env.VUE_APP_LANG ||
    document.querySelector("#app").getAttribute("lang");

  if (langFromOutside) {
    lang = langFromOutside;
  } else {
    lang = defaultLang;
  }

  i18n.locale.value = lang.toLowerCase();



  // Set html language attribute
  const htmlEl = document.querySelector("html");
  if (htmlEl) {
    htmlEl.setAttribute("lang", lang.toLowerCase());
  }
}

function setVHProperty() {
  if ($tvaMq.value === "mobile") {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
}


</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html {
  box-sizing: border-box;
  padding: 0 !important;
  margin: 0 !important;

}

.container {
  display: flex;
  max-width: calc(100% - 18rem);
  flex-direction: column;
  align-items: center;
  margin: 8rem 9rem 5rem 9rem !important;

  .mobile &, .tablet & {
    max-width: calc(100% - 3.6rem);
    margin: 8rem 1.8rem 5rem 1.8rem !important;
  }

}

body {
  overflow-y: scroll;
  box-sizing: border-box;


}
</style>
