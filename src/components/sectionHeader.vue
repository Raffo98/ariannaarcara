<template>
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
// import { useRouter } from 'vue-router';

// const bookmark = ref(0);
const stateSection = useStateStore();


// const router = useRouter();
// const route = useRoute();

const props = defineProps({
  content: Object,
});

const { $tvaMq } = useTvaMq();
provide("$tvaMq", $tvaMq);

const idSection = ref("");
const isHover = ref(false);
// const isHoverSub = ref(false);
// const idSub = ref("");


watch(stateSection, () => {
  if (stateSection.activeSectionId != idSection.value) {
    idSection.value = stateSection.activeSectionId;
  }
});


</script>
<style lang="scss" scoped>
.sectionHeader {
  position: relative;
  width: auto;
  display: flex;
  flex-direction: row;
  align-items: center;

  &__text {
    padding-right: 5px !important;

    &__title {
      @include header;
      position: relative;
      display: flex;
      justify-content: center;
      color: $color-black;
    }
  }

  .underline {
    position: absolute;
    bottom: -1px;
    width: 0;
    height: 2px;
    background-color: $color-black;
    transition: width 0.3s ease, left 0.3s ease;
  }

  .animate_underline {
    width: 100%;
  }


}
</style>
