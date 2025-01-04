<template>
    <div class="contacts">
        <div class="contacts__title">
            <h1 v-html="props.content.title"></h1>
        </div>
        <div class="contacts__text" v-html="props.content.text">
        </div>
        <div class="contacts__subtitle">
            <h2 v-html="props.content.info.title"></h2>
        </div>
        <div class="contacts__details">
            <div class="contacts__details__map">
                <a :href="props.content.image.link">
                    <img :src="`${$assetsBasePath}contacts/${props.content.image.name}.jpg`" />
                </a>
            </div>
            <div class="contacts__details__info">
                <div class="contacts__details__info__wrapper" v-for="detail, id in props.content.info.details" :key="id">
                    <div class="contacts__details__info__wrapper__title" v-html="detail.title"></div>
                    <div class="contacts__details__info__wrapper__detail" v-html="detail.content"></div>
                </div>
            </div>
        </div>
        <div class="contacts__cta">
            <h3 v-html="props.content.cta.title"></h3>
            <ctaButtonL :content="props.content.cta.button" />
        </div>
    </div>
</template>

<script setup>
import ctaButtonL from "@/components/ctaButtonL.vue";

const props = defineProps({
    content: Object,
});

</script>

<style lang="scss" scoped>
.contacts {
    width: 100%;
    padding: 3rem 3rem 0 3rem !important;

    .mobile & {
        padding: 1rem 1rem 0 1rem !important; 
    }

    &__title {
        padding-bottom: 2rem !important;

        h1 {
            @include h1;
            text-transform: uppercase;
            color: $color-black;
        }
    }

    &__text {
        padding-bottom: 3rem !important;

        @include paragraph;
        color: $color-black;
    }

    &__subtitle {
        h2 {
            @include h2;
            color: $color-black;
            text-transform: lowercase;
            padding-bottom: 1rem !important;

            &::first-letter {
                text-transform: capitalize;
            }
        }
    }

    &__details {
        padding-bottom: 3rem !important;
        display: flex;
        flex-direction: row;
        .mobile & {
            flex-direction: column;
            padding-bottom: 1rem !important;
        }

        &__map {
            width: 60%;
            padding-right: 1rem !important;
            .mobile & {
            width: 100%;
            padding: 0 0 1rem 0 !important;
            }
            img {
                width: 100%;
            }
        }

        &__info {
            &__wrapper {
                padding-bottom: 1.56rem !important;

                &__title {
                    @include text;
                    color: $color-orange;
                    text-transform: uppercase;

                }

                &__detail {
                    @include paragraph;
                    color: $color-black;
                }
            }
        }
    }

    &__cta {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 42vh;
        width: 100%;

        h3 {
            @include h2;
            color: $color-lightgrey;
            text-transform: lowercase;
            padding-bottom: 2rem !important;


            &::first-letter {
                text-transform: capitalize;
            }
        }

    }
}
</style>