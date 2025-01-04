<template>
    <div class="plants">
        <div class="plants__wrapper">
            <h1 class="plants__wrapper__title" v-html="props.content.title"></h1>
            <p class="plants__wrapper__text" v-html="props.content.text"></p>
        </div>
        <div class="plants__sections">
            <div class="plants__sections__plant" v-for="(plant, index) in props.content.sections" :key="index">
                <div class="plants__sections__plant__text">
                    <h2 class="plants__sections__plant__text__name" v-html="plant.name"></h2>
                    <div class="plants__sections__plant__text__description" v-html="plant.description"></div>
                </div>
                <div class="plants__sections__plant__img" v-if="plant.image">
                        <img :src="`${$assetsBasePath}plants/${plant.image}.jpg`">
                </div>
                <servicesAccordion :content="plant.accordion" />
            </div>
        </div>
        <div class="plants__cta">
            <div class="plants__cta__title">
                <p v-html="props.content.cta.title"></p>
            </div>
            <ctaButtonL :content="props.content.cta.button" />
        </div>

    </div>
</template>

<script setup>
import ctaButtonL from "@/components/ctaButtonL.vue";
import servicesAccordion from "@/components/servicesAccordion.vue";

const props = defineProps({
    content: Object,
});
</script>

<style lang="scss" scoped>
.plants {
    padding: 3rem 3rem 0 3rem !important;

    .mobile & {
        padding: 1rem 1rem 0 1rem !important;
    }

    &__wrapper {
        width: 100%;
        background-color: $color-softgrey;
        padding: 3rem 9rem !important;

        .mobile & {
            padding: 1rem 1rem !important;
        }

        &__title {
            @include h1;
            text-transform: uppercase;
            .mobile & {
                padding-bottom: 1rem !important;
            }
        }

        &__text {
            @include services-text;

            .mobile & {
                @include paragraph;
            }
        }
    }

    &__sections {
        &__plant {
            padding-top: 3rem !important;

            &__img {
                width: 100%;
                padding-bottom: 2rem !important;

                img {
                    width: 100%;
                    object-fit: cover;
                }
            }


            &__text {
                display: flex;
                flex-direction: row;
                padding-bottom: 2rem !important;

                .mobile & {
                    flex-direction: column;
                }

                &__name {
                    width: 30%;
                    @include h2;
                    text-transform: capitalize;

                    .mobile & {
                        width: 100%;
                        padding-bottom: 1rem !important;
                    }
                }

                &__description {
                    width: 70%;
                    @include paragraph;

                    .mobile & {
                        width: 100%;
                    }
                }
            }
        }
    }

    &__cta {
        width: 100%;
        padding: 9rem 0 !important;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;

        p {
            @include h2;
            color: $color-lightgrey;
            text-align: center;
            text-transform: none;
            padding-bottom: 2rem !important;

            &::first-letter {
                text-transform: capitalize;
            }
        }
    }
}
</style>