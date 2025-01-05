<template>
  <div :class="[$tvaMq]" :version="version.version">
    <Header class="header" :sections="$tm('header.sections')" @set-lang="setLanguage" />
    <div class="breadcrumbs">
    </div>
    <div class="container" v-if="dataReady">
      <router-view :content="$tm(`${path}`)" :data="i18n.locale.value === 'en' ? productDb.filter(product => product.lang === 'eng') : productDb.filter(product => product.lang === 'ita')"></router-view>
      <!-- <router-view :content="content" :preview="path == 'home' ? newsPreview : null"></router-view> -->
      <!-- <router-view :content="$tm('home')"></router-view> -->
    </div>
    <Footer :content="$tm('footer')" />
  </div>
</template>

<script setup>
import version from "@/../package.json";
import { onMounted, provide, ref, watchEffect, watch } from "@vue/runtime-core";
import useTvaMq from "./plugins/tvaMq.js";
import { useI18n } from "vue-i18n";
import { useStateStore } from "@/utilities/store/store";
import { onClickOutside } from '@vueuse/core';
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import airtable from "@/plugins/airtable.js";

import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";

const { $tvaMq } = useTvaMq();
const i18n = useI18n();
const route = useRoute();
const router = useRouter();

console.log(i18n.locale.value);



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
  console.log(route.fullPath, router)
  console.log(pathList.value)
  return route.name;
})

const dataReady = ref(false);

provide("$tvaMq", $tvaMq);
provide("version", version);


const modal = ref(null);
const stateModal = useStateStore();

// const idPage = ref(stateModal.pageSection);
const isMobile = ref('');

// Calling this here is equivalent to calling it in
// beforeCreated / create in Options API
// const instanceAttrs = getCurrentInstance().attrs;
setLanguage();

const newsDb = ref([]);
const productDb = ref([]);



const tagsList = ref([]);
const content = ref({});

// const fetchNewsData = async () => {
//   return new Promise((resolve, reject) => {
//     airtable.base('news').select({}).eachPage(
//       (records, fetchNextPage) => {
//         records.forEach(async (record) => {
//           newsDb.value.unshift({
//             id: record.fields.id,
//             title: record.fields.title,
//             text: record.fields.text,
//             tag: record.fields.tag,
//             date: record.fields.date,
//             img: record.fields.img[0].url
//           });
//         });
//         fetchNextPage();
//       },
//       (err) => {
//         if (err) {
//           console.error(err);
//           reject(err);
//         } 
//         else {
//           newsDb.value = newsDb.value.sort((a, b) => new Date(b.date) - new Date(a.date));
//           // console.log("NEWSDB ", newsDb.value);
//           resolve(newsDb.value);
//         }
//       }
//     );
//   });
// };

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
            gallery: record.fields.gallery || [] // Default a un array vuoto
          });
        });
        fetchNextPage();
      },
      (err) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        else {
          // newsDb.value = newsDb.value.sort((a, b) => new Date(b.date) - new Date(a.date));
          // // console.log("NEWSDB ", newsDb.value);
          // resolve(newsDb.value);
          completeMissingData();
        }
      }
    );
  });
};

//PRODUCTS SECTION
// Funzione per completare i dati mancanti
const completeMissingData = () => {
  // Raggruppa i prodotti per lingua
  const productsIta = productDb.value.filter(product => product.lang === 'ita');
  const productsEng = productDb.value.filter(product => product.lang === 'eng');

  // Mappa di prodotti in italiano per codice
  const itaMap = new Map(productsIta.map(product => [product.code, product]));

  // Loop sugli elementi in inglese e copia i dati mancanti
  productsEng.forEach(engProduct => {
    const itaProduct = itaMap.get(engProduct.code);

    if (itaProduct) {
      // Se `image` è mancante o vuoto, copia quello italiano
      if (!engProduct.img || engProduct.img === '') {
        engProduct.img = itaProduct.img;
      }

      // Se `gallery` è mancante o vuoto, copia quello italiano
      if (!engProduct.gallery || engProduct.gallery.length === 0) {
        engProduct.gallery = itaProduct.gallery;
      }
    }
  });

  console.log("Database aggiornato:", productDb.value);
};


const fetchData = async () => {
  try {
    // await fetchNewsData();
    fetchProductData();

    //create a list of all tags in news articles from db
    // newsDb.value.forEach(news => {
    //   news.tag.map(tag => {
    //     if (!tagsList.value.includes(tag)) {
    //       tagsList.value.push(tag);
    //     }
    //   })
    // })
    

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


watchEffect(() => {
  // Aggiorna content solo quando newsDb.value è definito
  // console.log("NEWSDB in WATCH ", newsDb.value);

  if (dataReady.value || 1 == 1) {
    // console.log("route: :", route, "name: ", route.name);

    if (path.value === 'news') {
      content.value = { static: i18n.tm(path.value), dinamic: newsDb.value, tags: tagsList.value };
    }
    else if (path.value === 'newsId') {
      const newsId = newsDb.value.filter(data => data.id == route.params.id);
      content.value = { dinamic: newsId[0] }
    }
    else {
      // console.log("WATCH 1: ", content.value, "i18n: ", i18n.tm(path.value), "path: ", path.value);
      content.value = i18n.tm(path.value);
      // console.log("WATCH 2: ", content.value, "i18n: ", i18n.tm(path.value), "path: ", path.value);

    }
  }
});


watch($tvaMq, () => {
  if ($tvaMq.value === "mobile") isMobile.value = $tvaMq.value;
  else {
    isMobile.value = '';
  }

}, i18n.locale.value, () => {
  console.log(i18n.locale.value);
}
);

// watch(propsNews, (test) => {
//   console.log(test);
// });


onClickOutside(modal, () => { if (stateModal.isOpen) { stateModal.changeState(false) } });

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

}

body {
  overflow-y: scroll;
  box-sizing: border-box;


}
</style>
