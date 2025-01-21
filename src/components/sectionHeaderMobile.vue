<template>
  <!-- @click="dropdown()" -->
  <div class="sectionHeader">
    <router-link :to="props.content.id === 'cv'
      ? { name: 'cv' }
      : props.content.id === 'about'
        ? { name: 'about' }
        : { name: 'gallery', params: { filter: props.content.id } }">
      <button class="sectionHeader__text" @mouseover="
        isHover = true;
      " @mouseleave="
        isHover = false;
      stateSection.changeSectionId('');
      ">
        <p class="sectionHeader__text__title">
          {{ props.content.title }}
          <span :class="{
            underline: true,
            animate_underline: isHover || idSection == props.content.title,
          }"></span>
        </p>
      </button>
    </router-link>
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
const isOpen = ref(false);

// const dropdown = () => {
//   isOpen.value = !isOpen.value;
//   stateSection.changeSectionId(props.content.title);
//   idSection.value = props.content.title;
// };


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
//   stateSection.updatePage(id.id);
// }


</script>
<style lang="scss" scoped>
.sectionHeader {
  position: relative;
  width: 100%;
  padding-top: 2rem !important;
  padding-left: 1.5rem !important;

  &__section {
    display: flex;
    align-items: center;
    width: 100%;

    &__title {
      @include header;
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

  }

}

// .dropdown-active {
//   max-height: 500px;
//   box-shadow: 0px 4px 8px 0px rgba(23, 23, 23, 0.5);
//   transition: all 0.9s ease;
// }</style>
