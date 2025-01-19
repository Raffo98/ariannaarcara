<template>
    <div class="gallery">
        <div class="gallery__title" v-html="filteredTitle"></div>
        <Gallery :data="props.data" :filter="filter" />
    </div>
</template>

<script setup>
import Gallery from "@/components/gallery.vue";
import { useRoute } from 'vue-router';
import { computed } from "vue";

const route = useRoute();

const filter = computed(() => {
  return route.params.filter;
})

const props = defineProps({
    data: Array,
    sections: Array
});





// Trova il titolo basandoti sull'id che corrisponde a filter
const filteredTitle = computed(() => {
  const matchingSection = props.sections.sections.find(section => section.id === filter.value);
  return matchingSection ? matchingSection.title : 'Default Title'; // Titolo predefinito se non c'è match
});
</script>

<style lang="scss" scoped>

.gallery {
    width: 100%;
    display: flex;
    flex-direction: column;

    &__title {
        @include hero-normal;
    }
}

</style>