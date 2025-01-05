<template>
  <div class="header">
    <div class="header__box">
      <router-link :to="{ name: 'home', params: { lang: isClickedLang } }">
        <p class="header__box__title">
          Arianna Arcara
        </p>
      </router-link>
      <div class="header__box__sections" v-if="$tvaMq == 'desktop' || $tvaMq == 'large'">
        <sectionHeader v-for="(section, idx) in props.sections" :key="idx" :content="section" />
        <div class="header__box__sections__buttons">
          <div class="header__box__sections__buttons__lang">
            <button @mouseover="isHoveredIta = true" @mouseleave="isHoveredIta = false"
              @click="$emit('setLang', 'it'); isClickedLang = 'it'"
              :style="{ color: isHoveredIta || isClickedLang == 'it' ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 1)' }"><u>ita</u></button> | <button
              @mouseover="isHoveredEng = true" @mouseleave="isHoveredEng = false"
              @click="$emit('setLang', 'en'); isClickedLang = 'en'"
              :style="{ color: isHoveredEng || isClickedLang == 'en' ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 1)' }"><u>eng</u></button>

            </div>
        </div>
      </div>
      <div class="header__box__hamburger" v-else>
        <button class="header__box__hamburger__btn" @click="dropdownMenu()">
          <img class="header__box__hamburger__btn__icon" :src="`${$assetsBasePath}icons/mobile/hamburger.svg`">
        </button>
        <div class="header__box__hamburger__wrapper" :class="{ slideDown: isOpenMobile }">
          <sectionHeaderMobile v-for="(section, idx) in props.sections" :key="idx" :content="section" />
          <div class="header__box__hamburger__wrapper__buttons">
            <div class="header__box__hamburger__wrapper__buttons__lang">
              <button @mouseover="isHoveredIta = true" @mouseleave="isHoveredIta = false"
                @click="$emit('setLang', 'it'); isClickedLang = 'it'"
                :style="{ color: isHoveredIta || isClickedLang == 'it' ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 1)' }">ita</button> | <button
                @mouseover="isHoveredEng = true" @mouseleave="isHoveredEng = false"
                @click="$emit('setLang', 'en'); isClickedLang = 'en'"
                :style="{ color: isHoveredEng || isClickedLang == 'en' ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 1)' }">eng</button>
            </div>
          </div>
        </div>
      </div>
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
const isHoveredIta = ref("");
const isHoveredEng = ref("");
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
  position: fixed; /* Fissa gli elementi alla pagina */
  left: 9rem;
  right: 9rem;
  position: fixed;
  top: 0;
  z-index: 1000;
  width: 100%;
  background-color: $color-white;


  &__box {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    width: calc(100% - 18rem);
    height: 79px;
    background-color: $color-white;
    border-bottom: 2px solid $color-black !important;
    // padding: 0 3rem 0 3rem !important;

    .mobile & {
      padding: 0 1rem 0 1rem !important;

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


      &__wrapper {
        position: absolute;
        top: 79px;
        left: 0;
        width: 100%;
        max-height: 0;
        background-color: $color-white;
        overflow: hidden;
        transition: max-height .9s ease;
        overflow-y: hidden;
        white-space: nowrap;

        &__buttons {
          display: flex;
          flex-direction: column;
          padding: 2rem 3rem 1rem 3rem !important;
          max-width: min-content;

          .mobile & {
            padding: 2rem 1rem 1rem 1rem !important;
          }

          &__lang {
            @include header;
            color: $color-black;
            padding-right: 1.5rem !important;
            padding-bottom: 3rem !important;


            button {
              text-transform: uppercase;

            }
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
      gap: 1rem; /* Gap fisso tra le sezioni */
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
}

.slideDown {
  max-height: 500px;
}

.border {
  border-bottom: 2px solid black !important;
  width: 100%;
}
</style>
