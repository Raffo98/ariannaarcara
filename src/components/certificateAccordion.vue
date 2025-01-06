<template>
    <div class="accordion">
        <div class="accordion__section" @click="toggleAccordion">
            <div class="accordion__section__header">
                <div class="accordion__section__header__title" v-html="props.type"></div>
                <div class="accordion__section__header__arrow">
                    <img :src="`${$assetsBasePath}icons/${item.open ? 'arrow-down' : 'arrow-up'}.svg`">
                </div>
            </div>
            <div class="accordion__section__list" :class="{ slideDown: item.open }">
                <div class="accordion__section__list__item" v-for="(sub, index) in props.content" :key="index">
                    <div class="accordion__section__list__item__download" v-if="sub.doc != null"
                        @mouseover="(hoverBtn = true, activeElement = index)"
                        @mouseleave="hoverBtn = false, activeElement = null" @click="openLink(...sub.doc)">
                        <img class="accordion__section__list__item__download__rect"
                            :class="{ onHoverRect: hoverBtn && activeElement == index }"
                            :src="`${$assetsBasePath}icons/download/download-rect.svg`">
                        <img class="accordion__section__list__item__download__arrow"
                            :class="{ onHoverArrow: hoverBtn && activeElement == index }"
                            :src="`${$assetsBasePath}icons/download/download-arrow.svg`">
                    </div>
                    <div class="accordion__section__list__item__wrapper">
                        <div class="accordion__section__list__item__wrapper__subtitle">
                            {{ sub.name }}
                        </div>
                        <div class="accordion__section__list__item__wrapper__content">
                            {{ sub.description }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    content: Array,
    type: Text
});


const hoverBtn = ref(false);
const activeElement = ref();

const item = ref(
    { open: ref(false) },
);

const toggleAccordion = () => {
    item.value.open = !item.value.open;
};

const openLink = (link) => {
    window.open(link.url, "_blank");
}

</script>

<style lang="scss" scoped>
.accordion {
    width: 100%;
    cursor: pointer;
    position: relative;
    padding-bottom: 1rem !important;

    &__section {
        @include paragraph-bold;
        background-color: $color-purewhite;
        transition: background-color .3s ease;
        border-top: 1px solid $color-softgrey !important;
        border-bottom: 1px solid $color-softgrey !important;

        &:hover {
            background-color: $color-softgrey;
        }


        &__header {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 1rem 1.5rem 1rem 1.5rem !important;


            &__title {
                @include paragraph-bold;
                text-transform: capitalize;

            }

            &__arrow {
                padding: .6rem 1rem .3rem 1rem !important;
                border: 1px solid $color-softgrey !important;
                background-color: $color-purewhite;

                top: 30%;
                bottom: 0;
                right: 0;
            }
        }

        &__list {
            overflow: hidden;
            background-color: $color-purewhite;
            max-height: 0;
            transition: max-height 5s ease;

            &__item {
                width: 100%;
                padding: 1rem 1.5rem 1rem 1.5rem !important;
                border-top: 1px solid $color-softgrey !important;
                display: flex;
                flex-direction: row;

                &__download {
                    position: relative;
                    border: 1px solid $color-softgrey !important;
                    height: 16px;
                    width: 16px;
                    padding: 1rem 1rem !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;



                    &__rect {
                        transition: transform .5s ease;
                    }

                    .onHoverRect {
                        transform: scale(400%);
                    }

                    &__arrow {
                        position: absolute;
                        transition: transform .6s ease, filter .3s ease;
                        filter: invert(0%) sepia(0%) saturate(0%) hue-rotate(360deg) brightness(81%) contrast(99%);
                        left: 25%;
                        top: 25%;
                    }

                    .onHoverArrow {
                        transform: scale(150%);
                        filter: invert(45%) sepia(50%) saturate(2400%) hue-rotate(360deg) brightness(81%) contrast(99%);
                    }
                }

                &__wrapper {
                    padding-left: 1rem !important;

                    &__subtitle {
                        @include paragraph-bold;
                        padding-bottom: 1rem !important;
                    }

                    &__content {
                        @include section-style;
                    }
                }
            }
        }
    }
}


.slideDown {
    max-height: 9999px;
}
</style>