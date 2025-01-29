<template>
    <div class="slideshow">
        <Carousel :items-to-show="1" :wrap-around="true" :autoplay="false">
            <Slide v-for="(image, index) in images" :key="index">
                <div class="slide">
                    <img :src="route.name === 'about' ? `${$assetsBasePath}about/${image}` : image" alt=""
                        class="carousel-image" />
                </div>
            </Slide>
            <template #addons>
                <CarouselNavigation>
                    <template #prev>
                        <div class="arrow" @click="prev"><img :src="`${$assetsBasePath}icons/arrow-left.svg`" alt="" />
                        </div>
                    </template>
                    <template #next>
                        <div class="arrow" @click="next"><img :src="`${$assetsBasePath}icons/arrow-right.svg`"
                                alt="" />
                        </div>
                    </template>
                </CarouselNavigation>
            </template>
        </Carousel>
        <div class="image-counter">
            {{ currentIndex }} / {{ images.length }}
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Carousel, Slide } from 'vue3-carousel';
import { useRoute } from 'vue-router';
import { Navigation as CarouselNavigation } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

const props = defineProps({
    gallery: Array
});

const route = useRoute();

const images = props.gallery.map(item => item.url ? item.url : item);

// Indice attuale
const currentIndex = ref(1);

// Metodo per aggiornare l'indice
function next() {
    if (currentIndex.value + 1 > images.length) {
        currentIndex.value = 1;
    }
    else {
        currentIndex.value = currentIndex.value + 1;
    }
}

function prev() {
    if (currentIndex.value == 1) {
        currentIndex.value = images.length;
    }
    else {
        currentIndex.value = currentIndex.value - 1;
    }
}

</script>

<style lang="scss" scoped>
/* Contenitore del carousel */
.slide {
    aspect-ratio: 5 / 4;
    /* Altezza fissa per il carousel */
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Immagini nel carousel */
.carousel-image {
    max-height: 100%;
    /* Si adatta all'altezza del contenitore */
    max-width: 100%;
    /* Mantiene le proporzioni */
    object-fit: contain;
    /* Adatta l'immagine senza tagliare */
}

.arrow {
    background-color: $color-softgrey;
    opacity: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20%;
    transition: background-color .3s ease;
}

.arrow:hover {
    background-color: $color-white;
}

.image-counter {
    padding-top: .2rem !important;
    @include details;
}
</style>