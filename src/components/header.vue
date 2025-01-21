<template>
  <div class="header">
    <div class="header__box">
      <router-link :to="{ name: 'home', query: { lang: isClickedLang } }">
        <p class="header__box__title">
          Arianna Arcara
        </p>
      </router-link>
      <div class="header__box__sections" v-if="$tvaMq == 'desktop' || $tvaMq == 'large'">
        <sectionHeader v-for="(section, idx) in props.sections" :key="idx" :content="section" />
        <div class="header__box__sections__buttons">
          <div class="header__box__sections__buttons__lang">
            <button @click="$emit('setLang', 'it'); isClickedLang = 'it'"><u>ita</u></button>
            | <button @click="$emit('setLang', 'en'); isClickedLang = 'en'"><u>eng</u></button>

          </div>
        </div>
      </div>
      <div class="header__box__hamburger" v-else>
        <button class="header__box__hamburger__btn" @click="dropdownMenu()">
          <img class="header__box__hamburger__btn__icon" :src="`${$assetsBasePath}/icons/mobile/hamburger.svg`">
        </button>
        <div class="header__box__hamburger__buttons">
          <div class="header__box__hamburger__buttons__lang">
            <button @click="$emit('setLang', 'it'); isClickedLang = 'it'"><u>ita</u></button>
            | <button @click="$emit('setLang', 'en'); isClickedLang = 'en'"><u>eng</u></button>

          </div>
        </div>

      </div>
    </div>
    <div class="header__wrapper" :class="{ slideDown: isOpenMobile }">
      <button class="header__wrapper__btn" @click="dropdownMenu()">
        <img class="header__wrapper__btn__icon" :src="`${$assetsBasePath}/icons/mobile/close.svg`">
      </button>
      <sectionHeaderMobile v-for="(section, idx) in props.sections" :key="idx" :content="section" />
      <!-- <div class="header__box__hamburger__wrapper__buttons"> -->
      <!-- <div class="header__box__hamburger__wrapper__buttons__lang">
              <button @mouseover="isHoveredIta = true" @mouseleave="isHoveredIta = false"
                @click="$emit('setLang', 'it'); isClickedLang = 'it'"
                :style="{ color: isHoveredIta || isClickedLang == 'it' ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 1)' }">ita</button> | <button
                @mouseover="isHoveredEng = true" @mouseleave="isHoveredEng = false"
                @click="$emit('setLang', 'en'); isClickedLang = 'en'"
                :style="{ color: isHoveredEng || isClickedLang == 'en' ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 1)' }">eng</button>
            </div>
          </div> -->
    </div>
  </div>
</template>
<script setup>
import { provide, watch } from "@vue/runtime-core";
import useTvaMq from "@/plugins/tvaMq.js";
import { ref } from "@vue/reactivity";
// import { useStateStore } from '@/utilities/store/store';
import sectionHeader from "@/components/sectionHeader.vue";
import sectionHeaderMobile from "@/components/sectionHeaderMobile.vue";
import { useRoute } from 'vue-router';

const route = useRoute();


// const bookmark = ref(0);
const props = defineProps({
  sections: Array,
  button: Object
});

const { $tvaMq } = useTvaMq();
provide("$tvaMq", $tvaMq);
const isClickedLang = ref("it");
const isOpenMobile = ref(false);

function dropdownMenu() {
  isOpenMobile.value = !isOpenMobile.value;
}

// const stateModal = useStateStore();
// const selectedId = stateModal.activeId;

watch(route, () => {
  isOpenMobile.value = false;
});

watch(isOpenMobile, (newValue) => {
  if (newValue) {
    document.documentElement.classList.add("no-scroll"); // Usa document.documentElement per <html>
  } else {
    document.documentElement.classList.remove("no-scroll");
  }
});



// watch(
//   stateModal, () => {
//     if (stateModal.activeId != selectedId.value) {
//       selectedId.value = stateModal.activeId;
//     }
//   },
// );
</script>
<style lang="scss" scoped>
.header {
  position: fixed;
  /* Fissa gli elementi alla pagina */
  left: 9rem;
  right: 9rem;
  top: 0;
  z-index: 9998;
  width: 100%;
  background-color: $color-white;

  .mobile &, .tablet & {
    left: 1.8rem;
    right: 1.8rem;
  }


  &__box {
    // position: relative;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    width: calc(100% - 18rem);
    height: 79px;
    background-color: $color-white;
    border-bottom: 2px solid $color-black !important;
    // padding: 0 3rem 0 3rem !important;

    .mobile &, .tablet & {
      width: calc(100% - 3.6rem);

    }

    &__title {
      @include header-bold;
      white-space: nowrap;
    }

    &__hamburger {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      position: relative;

      &__btn {
        display: flex;
        align-items: center;
      }

      &__buttons {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-left: 1rem !important;

        &__lang {
          @include header;
          color: $color-black;

          button {
            text-transform: uppercase;
          }
        }

      }
    }

    &__sections {
      min-width: 50%;
      flex-wrap: wrap;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      white-space: nowrap;
      gap: 1rem;
      /* Gap fisso tra le sezioni */
      margin-left: auto;

      &__buttons {
        display: flex;
        flex-direction: row;
        align-items: center;

        &__lang {
          @include header;
          color: $color-black;

          button {
            text-transform: uppercase;
          }
        }

      }

    }
  }

  &__wrapper {
    @include text-SS;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 0; // Cambiato da 0vh a 0
    overflow: hidden; // Assicura che il contenuto non esca dall'area visibile
    max-height: none !important;
    /* Rimuovi eventuali limiti */
    margin-left: -1.8rem !important;
    /* Elimina margini non necessari */
    padding: 0 !important;
    opacity: 0;
    color: $color-white;
    // max-height: 0;
    background-color: black;
    z-index: 9999;
    transform: translateY(1rem); // Sposta il wrapper verso il basso
    transition: transform 0.3s ease, opacity 0.2s ease;

    &__btn {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      padding-top: 1.5rem !important;
      padding-right: 1.5rem !important;
    }
  }
}

.slideDown {
  height: 100vh;
  transform: translateY(0); // Torna alla posizione originale
  opacity: 100;
}

.border {
  border-bottom: 2px solid black !important;
  width: 100%;
}

.no-scroll {
  overflow: hidden;
  height: 100vh;
}
</style>
