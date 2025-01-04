<template>
    <div class="filter" ref="filter">
        <div class="filter__box" @mouseover="isHover = true" @mouseleave=" isHover = false" @click="isClicked = !isClicked"
            :style="[isHover ? { backgroundPosition: 'left bottom' } : { backgroundPosition: 'right bottom' }]">
            <p class="filter__box__text" v-html="props.content.text" v-if="$tvaMq == 'desktop' || $tvaMq == 'large'"></p>
            <img :src="`${$assetsBasePath}icons/news/${props.content.icon}.svg`" />
        </div>
        <fieldset class="filter__checkbox" v-if="isClicked">
            <div class="filter__checkbox__check" v-for="tag in props.tags" :key="tag">
                <input type="checkbox" ref="el" :id="tag" :value="tag" v-model="checkedTags" />
                <label :for="tag" v-html="tag"></label>
            </div>
        </fieldset>
    </div>
</template>

<script setup>
import { ref, watch } from "@vue/runtime-core";
import { onClickOutside } from '@vueuse/core';

const props = defineProps({
    content: Object,
    tags: Array
});

const emit = defineEmits(['update-tags']);

const isHover = ref(false);
const checkedTags = ref([]);
const isClicked = ref(false);
const filter = ref(null);

onClickOutside(filter, log => {
    if (log) {
        isClicked.value = false;
    }

});


watch(checkedTags, (e) => {
    emit('update-tags', e);
});



</script>

<style lang="scss" scoped>
.filter {
    position: relative;
    box-sizing: border-box;
    height: 41px;
    width: fit-content;
    border: 1.5px solid $color-orange !important;
    cursor: pointer;


    &__box {
        display: flex;
        flex-direction: row;
        align-self: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: linear-gradient(to right, $color-white 50%, $color-orange 50%);
        background-size: 200% 100%;
        padding: 8px 16px !important;
        transition: all 0.8s ease;

        &:hover {
            p {
                color: $color-orange;
            }

            img {
                filter: invert(45%) sepia(50%) saturate(2400%) hue-rotate(360deg) brightness(81%) contrast(99%) !important;
                transition: filter 0.5s ease;
            }
        }

        p {
            @include paragraph-m;
            color: $color-white;
            transition: color 0.5s ease;
            padding-right: 1.25rem !important;

        }

        img {
            filter: invert(50%) sepia(0%) saturate(0%) hue-rotate(133deg) brightness(1200%) contrast(90%) !important;
        }
    }

    &__checkbox {
        border: 1.5px solid $color-orange !important;
        background-color: $color-white;
        width: fit-content;
        position: absolute;
        right: -1.5px;
        padding: 1rem 1.375rem !important;


        &__check {
            padding: 0.3rem !important;
            display: flex;
            align-self: center;



            input[type="checkbox"] {
                appearance: none;
                border: 2px solid $color-lightgrey !important;
                background-color: $color-white !important;
                border-radius: 0.2rem;
                width: 14px;
                height: 14px;
                position: relative;
                cursor: pointer;
                transition: border .2s ease;
                display: flex;
                align-self: center;
                justify-content: center;
                transition: background-color .2s ease;
                place-content: center;


                &:checked {
                    border: 2px solid $color-orange !important;
                    transition: border .2s ease, background-color .2s ease;
                    background-color: $color-orange !important;




                    &::before {
                        transform: scale(1) !important;
                    }
                }

                &::before {
                    content: "";
                    width: 14px;
                    height: 9px;
                    background-color: $color-white !important;
                    clip-path: polygon(33.333% 100%, 0% 57.447%, 11.667% 42.553%, 33.333% 70.213%, 88.333% 0%, 100% 14.894%, 33.333% 100%);
                    transform: scale(0);
                }

            }

            label {
                @include paragraph-m;
                color: $color-orange;
                text-wrap: nowrap;
            }
        }
    }
}
</style>