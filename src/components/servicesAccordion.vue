<template>
    <div class="accordion">

        <div class="accordion__section" @click="toggleAccordion">
            <div class="accordion__section__header">
                <div class="accordion__section__header__title" v-html="props.content.header"></div>
                <div class="accordion__section__header__arrow">
                    <img :src="`${$assetsBasePath}icons/service/${isOpen ? 'arrow-down' : 'arrow-up'}.svg`">
                </div>
            </div>
            <div class="accordion__section__list" :class="{ slideDown: isOpen }">
                <div class="accordion__section__list__item" v-for="(detail, index) in props.content.details" :key="index">
                    <div class="accordion__section__list__item__detail">
                        <div class="accordion__section__list__item__detail__subtitle" v-html="detail.name">
                        </div>
                        <div class="accordion__section__list__item__detail__content" v-html="detail.description">
                        </div>
                    </div>

                </div>
                <div class="accordion__section__list__processes">
                    <div class="accordion__section__list__processes__header" v-html="props.content.processes.header"></div>
                    <div class="accordion__section__list__processes__process">
                        <div class="accordion__section__list__processes__process__name" v-html="process.name" v-for="(process, index) in props.content.processes.items" :key="index"></div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    content: Object,
});

const isOpen = ref(false);

const toggleAccordion = () => {
    isOpen.value = !isOpen.value;
};

</script>

<style lang="scss" scoped>
.accordion {
    width: 100%;
    cursor: pointer;
    position: relative;

    &__section {
        @include paragraph-bold;
        background-color: $color-black;
        transition: background-color .3s ease;
        width: 100%;

        &__header {
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 2.25rem 3rem 2.25rem 3rem !important;

            .mobile & {
                padding: 1rem 2rem 1rem 2rem !important;
            }


            &__title {
                @include text;
                text-transform: uppercase;
                color: $color-purewhite;
            }

            &__arrow {
                display: flex;
                align-items: center;
                top: 30%;
                bottom: 0;
                right: 0;

            }
        }

        &__list {
            width: 100%;
            overflow: hidden;
            background-color: $color-black;
            max-height: 0;
            transition: max-height .8s ease;
            display: flex;
            flex-direction: column;
            flex-flow: wrap;
            padding: 0 3rem 0 3rem !important;
            gap: 1rem;

            .mobile & {
                padding: 0 1rem 0 1rem !important;

            }


            &__item {
                width: 49%;
                height: 180px;
                padding: 1rem 1rem 1rem 1rem !important;
                border: 1px solid $color-purewhite !important;

                .mobile & {
                    width: 100%;
                    height: 210px;

                }

                &__detail {
                    &__subtitle {
                        @include text;
                        text-transform: uppercase;
                        padding-bottom: .7rem !important;
                        color: $color-purewhite;
                    }

                    &__content {
                        color: $color-purewhite;
                        @include paragraph;

                        &::first-letter {
                            text-transform: capitalize;
                        }
                    }
                }

            }

            &__processes {
                width: 100%;
                padding-bottom: 3rem !important;

                &__header {
                    @include text;
                    color: $color-purewhite;
                    text-transform: uppercase;
                    .mobile & {
                        padding-bottom: 1rem !important;
                    }
                }

                &__process {
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    flex-flow: wrap;
                    gap: 1rem;


                    &__name {
                        @include text;
                        color: $color-purewhite;
                        text-transform: uppercase;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 49%;
                        height: 180px;
                        border: 1px solid $color-purewhite !important;

                        .mobile & {
                            width: 100%;
                        }
                    }
                }

            }


        }
    }
}

.slideDown {
    max-height: 5000px;
}
</style>