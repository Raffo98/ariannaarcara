<template>
    <div class="home">
        <div class="home__hero">
            <h2 class="home__hero__text" v-html="props.content.hero.title"></h2>
            <router-link :to="{ name: 'cv' }">
                <div class="home__hero__readmore" v-html="props.content.hero.cta"></div>
            </router-link>
        </div>
        <Gallery :data="data" />
    </div>
</template>

<script setup>
// import { useStateStore } from "@/utilities/store/store";
import { provide } from "@vue/runtime-core";
import useTvaMq from "@/plugins/tvaMq.js";
import Gallery from "@/components/gallery.vue";


const { $tvaMq } = useTvaMq();
provide("$tvaMq", $tvaMq);

const props = defineProps({
    content: Object,
    data: Array
});

// const isScrolling = useStateStore();
// const scrollIncrement = ref(0);
// const maxLength = ref();
// const textElement = ref();

//maxlength for preview news
// function newsPreview(newsLength, text) {
//     if (text.length > newsLength) {
//         return text = text.substring(0, newsLength) + '...';
//     }
//     else return text;
// }



// watch(isScrolling, () => {
//     scrollIncrement.value = isScrolling.scrollState;
// });

// watch($tvaMq, () => {
//     if ($tvaMq.value === "mobile") {
//         maxLength.value = 150;
//         textElement.value = newsPreview(maxLength.value, props.preview.latest.text);
//     }
//     else {
//         maxLength.value = 300;
//         textElement.value = newsPreview(maxLength.value, props.preview.latest.text);
//     }
// });

</script>

<style lang="scss" scoped>
.home {
    width: 100%;

    &__hero {
        padding-top: 2rem !important;
        padding-bottom: 2rem !important;


        &__text {
            @include hero;
            padding-bottom: 2rem !important;

        }

        &__readmore {
            @include text-S;
            text-decoration: underline;

        }
    }
}
</style>