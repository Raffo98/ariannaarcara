<template>
    <div class="product">
        <div class="product__info">
            <div class="product__info__productcode">
                {{ props.content.info.code }} {{ product[0].code }}
            </div>
            <div class="product__info__title" v-html="product[0].title"></div>
            <div class="product__info__price">€900,00 – €1.400,00</div>
            <div class="product__info__cta">
                <button v-html="props.content.info.cta"></button>
            </div>
            <div class="product__info__details">
                <Accordion />
                <Accordion />
                <Accordion />
                <Accordion />
            </div>
        </div>
        <div class="product__gallery" v-if="product[0].gallery.length > 0">AOOOOO</div>
        <div class="product__image" v-else><img :src="product[0].img"></div>
    </div>
</template>

<script setup>
import Accordion from "@/components/accordion.vue";
import { useRoute } from 'vue-router'

const route = useRoute()

const props = defineProps({
    content: Object,
    data: Object
});

const product = props.data.filter(item => item.code === route.params.id);

console.log(product)


</script>

<style lang="scss" scoped>
.product {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1.4rem;

    &__info {
        width: 50%;

        &__productcode {
            @include details;
        }

        &__title {
            @include title;
            padding-top: 1.4rem !important;

        }

        &__price {
            @include text-M;
            padding-top: 1.4rem !important;

        }

        &__cta {
            color: $color-white;
            @include text-M;
            padding-top: 1.4rem !important;


            button {
                background-color: $color-black !important;
                padding: 0.875rem 1.625rem 0.875rem 1.625rem !important;
            }
        }

        &__details {
            padding-top: 1.4rem !important;
            width: 100%;
        }
    }

    &__image {
        width: 50%;

        img {
            box-sizing: border-box;
            width: 100%;
        }
    }
}
</style>