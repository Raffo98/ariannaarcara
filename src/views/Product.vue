<template>
    <div class="product">
        <div class="product__info">
            <div class="product__info__productcode">
                {{ props.content.info.code }} {{ product[0].code }}

            </div>
            <div class="product__info__title" v-html="props.data.filter(item => item.code === route.params.id)[0].title"></div>
            <div class="product__info__price" v-if="price[1] != 0">
                <div>€&nbsp;</div>
                <div class="product__info__price__min" v-html="price[1]"></div>
                <div>&nbsp;-&nbsp;€&nbsp;</div>
                <div class="product__info__price__max" v-html="price[0]"></div>
            </div>
            <div class="product__info__price" v-else>
                <div>€&nbsp;</div>
                <div class="product__info__price__min" v-html="price[0]"></div>
            </div>
            <div class="product__info__cta">
                <a :href="`mailto:arcara.studio@gmail.com?subject=Limited%20edition%20sale%20-%20${product[0].code}`">
                    <button v-html="props.content.info.cta"></button>
                </a>
            </div>
            <div class="product__info__details" v-for="(detail, idx) in props.data.filter(item => item.code === route.params.id)[0].product.accordions" :key="idx">
                {{ }}
                <Accordion :details="detail" :titles="props.content.info.accordion
                    .filter(item => Object.keys(detail).includes(item.id))
                    .map(item => ({ id: item.id, text: item.text }))" />

            </div>
        </div>
        <div class="product__gallery" v-if="product[0].gallery.length > 0">
            <Slideshow :gallery="product[0].gallery" />
        </div>
        <div class="product__image" v-else><img :src="product[0].img"></div>
    </div>
</template>

<script setup>
import Accordion from "@/components/accordion.vue";
import Slideshow from "@/components/slideshow.vue";
import { useRoute } from 'vue-router';
import { ref, onBeforeMount } from "vue";
import { useI18n } from "vue-i18n";
const i18n = useI18n();

const route = useRoute();
const product = ref([]);
const price = ref([0, 0]);

const props = defineProps({
    content: Object,
    data: Array
});


onBeforeMount(() => {
    if (props.data) {
        product.value = props.data.filter(item => item.code === route.params.id);
        if (product.value[0].product.price[0] == product.value[0].product.price[1]) {
            price.value[0] = product.value[0].product.price[0].toLocaleString(i18n.locale.value, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        }
        else {
            price.value[0] = product.value[0].product.price[0].toLocaleString(i18n.locale.value, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            price.value[1] = product.value[0].product.price[1].toLocaleString(i18n.locale.value, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        }
    }
console.log(product.value);

});



</script>

<style lang="scss" scoped>
.product {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1.4rem;

    .mobile & {
        flex-direction: column;
    }

    &__info {
        width: 50%;

        .mobile & {
            width: 100%;
        }

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

        &__price {
            display: flex;
            flex-direction: row;
        }

        &__details {
            padding-top: 0.5rem !important;
            width: 100%;
        }
    }

    &__image {
        width: 50%;

        .mobile & {
            width: 100%;
            order: -1;
        }

        img {
            box-sizing: border-box;
            width: 100%;
        }
    }

    &__gallery {
        width: 50%;

        .mobile & {
            width: 100%;
        }
    }
}
</style>