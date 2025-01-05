<template>
    <div class="product">
        <div class="product__info">
            <div class="product__info__productcode">
                Codice prodotto: P017
            </div>
            <div class="product__info__title">Senza titolo dalla serie
                “Altra versione dello stesso paesaggio”</div>
            <div class="product__info__price">€900,00 – €1.400,00</div>
            <div class="product__info__cta">
                <button>
                    Richiedi informazioni
                </button>
            </div>
            <div class="product__info__details">
                <Accordion />
                <Accordion />
                <Accordion />
                <Accordion />
            </div>
        </div>
        <div class="product__image"><img :src="`${$assetsBasePath}/gallery/1.jpg`"></div>
    </div>
</template>

<script setup>
import Accordion from "@/components/accordion.vue";



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