<template>
    <div class="box">
        <router-link :to="{ name: 'product', params: { id: `${props.product.code}` } }">
            <div class="box__wrapper">

                <img :src="props.img.img">
            </div>
            <div class="box__title">
                <p v-html="props.product.title"></p>
            </div>
        </router-link>

    </div>
</template>

<script setup>

const props = defineProps({
    product: Object,
    img: Object
});

</script>

<style lang="scss" scoped>
.box {
    cursor: pointer !important;
    width: calc((100% - 5rem) / 3);
    box-sizing: border-box;

    .mobile & {
        // width: calc((100% - 3.6rem) / 1);
        width: 100%;
    }

    &__wrapper {
        height: 75vh;
        display: flex;
        align-items: center;
        background-color: $color-white;
        transition: all .2s ease;

        .mobile & {
            height: auto;
        }

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
        padding-top: 2rem !important;


    }
}
</style>