<template>
    <div class="box">
        <div class="box__wrapper">
            <img :src="`${$assetsBasePath}/gallery/1.jpg`">
        </div>
        <div class="box__title">
            <p>Senza titolo dalla serie “Altra versione dello stesso paesaggio”</p>
        </div>

    </div>
</template>

<script setup>


// const props = defineProps({
//     content: Object,
// });

</script>

<style lang="scss" scoped>
.box {
    width: calc((100% - 5rem) / 3);
    box-sizing: border-box;

    &__wrapper {
        height: 50vh;
        display: flex;
        align-items: center;
        background-color: $color-white;
        transition: all .2s ease;

        &:hover {
            background-color: $color-softgrey;
        }

        img {
            width: 100%;
            /* L'immagine si adatta alla larghezza del box */
            height: auto;
            /* Mantiene le proporzioni */
            object-fit: contain;
            padding: 0.5rem 0.5rem 0.5rem 0.5rem !important;

        }
    }

    &__title {
        @include text-SS;
        box-sizing: border-box;
        text-align: center;

    }
}
</style>