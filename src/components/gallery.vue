<template>
    <div class="gallery">
        <div class="gallery__wrapper">
            <GalleryBox v-for="(product, idx) in filteredData" :key="idx" :product="product" />
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import GalleryBox from "@/components/galleryBox.vue";

const props = defineProps({
  data: Array,
  filter: String,
});


// Computed property per filtrare i dati
const filteredData = computed(() => {
  if (props.filter) {
    return props.data.filter(product => product.category === props.filter);
  }
  return props.data; // Restituisce tutti i dati se il filtro non esiste
});

</script>

<style lang="scss" scoped>

.gallery {
    width: 100%;
    display: flex;

    &__wrapper {
        display: flex;
        flex-direction: row;
        width: 100%;
        flex-wrap: wrap;
        gap: 2.5rem;
        justify-content: flex-start;
    
    }
}

</style>