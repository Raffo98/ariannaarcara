<template>
    <div class="gallery">
        <div class="gallery__wrapper">
            <GalleryBox />
            <GalleryBox />
            <GalleryBox />
            <GalleryBox />
            <GalleryBox />
            <GalleryBox />
            <GalleryBox />
            <GalleryBox />
            <GalleryBox />
            <GalleryBox />
            <GalleryBox />
            <GalleryBox />
            <GalleryBox />
            <GalleryBox />

        </div>
    </div>
</template>

<script setup>
import GalleryBox from "@/components/galleryBox.vue";


// const props = defineProps({
//     content: Object,
// });

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