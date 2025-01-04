<template>
  <!-- @click="dropdown()" -->
  <div class="sectionHeader">
    <router-link :to="{ name: `${idSection == 'news' ? idSection : ''}` }">
      <button class="sectionHeader__section" @click="
      dropdown();
    ">
        <p class="sectionHeader__section__title" v-html="props.content.title" :style="{
      color:
        isOpen
          ? 'rgba(231, 83, 23, 1)'
          : 'rgba(247, 247, 247, 1)',
    }"></p>
        <div class="sectionHeader__section__arrow" v-if="props.content.subsections.length > 0">
          <img :src="`${$assetsBasePath}icons/arrow.svg`" :class="{
      sectionHeader__section__arrow__icon: true,
      rotate: isOpen,
      'active-arrow': isOpen,
    }" />
        </div>
      </button>
    </router-link>

    <div class="sectionHeader__dropdown">
      <router-link :to="{ name: `${idSub}` }">
        <div class="sectionHeader__dropdown__subsection" :class="{ slideDown: isOpen }">
          <button class="sectionHeader__dropdown____subsection__btn" v-for="(sub, idx) in props.content.subsections"
            :key="idx" @click="idSub = sub.id">
            <p class="sectionHeader__dropdown__subsection__btn__text" v-html="sub.title"></p>
          </button>
        </div>
      </router-link>

    </div>
  </div>
</template>
<script setup>
import { provide, ref, watch } from "@vue/runtime-core";
import useTvaMq from "@/plugins/tvaMq.js";
import { useStateStore } from "@/utilities/store/store";
// import { useRoute } from 'vue-router';

// const route = useRoute();

// const bookmark = ref(0);
const stateSection = useStateStore();


const props = defineProps({
  content: Object,
});

const { $tvaMq } = useTvaMq();
provide("$tvaMq", $tvaMq);

const idSection = ref("");
// const isHover = ref(false);
// const isHoverSub = ref(false);
const idSub = ref("");
const isOpen = ref(false);

const dropdown = () => {
  isOpen.value = !isOpen.value;
  stateSection.changeSectionId(props.content.title);
  idSection.value = props.content.title;
};


watch(stateSection, () => {
  if (stateSection.activeSectionId != props.content.title) {
    isOpen.value = false;
  }
});

// watch(route, () => {
//   isOpen.value = false;
// });

// function dropdown() {
//   stateSection.changeSectionId(props.content.title);
// }

// function setIdPage(id) {
//   console.log(id.id);
//   stateSection.updatePage(id.id);
// }


</script>
<style lang="scss" scoped>
.sectionHeader {
  position: relative;
  width: 100%;
  padding-top: 2rem !important;

  &__section {
    display: flex;
    align-items: center;
    width: 100%;

    &__title {
      @include paragraph-m;
      text-align: left !important;
      position: relative;
      // padding-right: 5px !important;
      color: $color-white;
      padding: 0 3rem 0rem 3rem !important;
      transition: color 0.5s ease;

      .mobile & {
        padding: 0 1rem 0rem 1rem !important;

      }
    }

    &__arrow {
      &__icon {
        filter: invert(10%) sepia(49%) saturate(0%) hue-rotate(330deg) brightness(110%) contrast(94%);
        transition: transform 0.3s ease, filter 0.3s ease;
      }
    }


  }

  &__dropdown {

    &__subsection {
      display: flex;
      flex-direction: column;
      max-height: 0;
      overflow: hidden;
      transition: max-height .8s ease;

      &__btn {
        &__text {
          // padding: 14px 8px 14px 8px !important;
          color: $color-white;
          @include paragraph-m;
          text-align: left;
          padding: 1rem 3rem 0rem 3rem !important;

          .mobile & {
            padding: 1rem 1rem 0rem 1rem !important;

          }
        }
      }
    }
  }
}

.slideDown {
  max-height: 200px;
}

.rotate {
  transform: rotate(180deg);
  color: $color-orange;
  /* Applica la rotazione quando l'arrow è "rotated" */
}

.active-arrow {
  filter: invert(42%) sepia(49%) saturate(2300%) hue-rotate(330deg) brightness(83%) contrast(100%);
}

// .dropdown-active {
//   max-height: 500px;
//   box-shadow: 0px 4px 8px 0px rgba(23, 23, 23, 0.5);
//   transition: all 0.9s ease;
// }</style>
