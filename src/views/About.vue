<template>
  <div class="about">
    <Slideshow :gallery="props.content.carousel" />
    <div class="about__text" v-html="props.content.text"></div>
  </div>
</template>

<script setup>
import Slideshow from "@/components/slideshow.vue";

const props = defineProps({
  content: Object,
});

</script>


<style lang="scss" scoped>
.about {
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: calc(100% - 35rem);

  .mobile &, .tablet & {
  max-width: 100%;

  }

  &__text {
    padding-top: 2rem !important;
    @include text-SS;
    line-height: 160%;

    .mobile & {
      @include text-M;
    }

  }

}
</style>