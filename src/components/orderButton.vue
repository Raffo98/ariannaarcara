<template>
    <div class="order" ref="order">
        <div class="order__box" @mouseover="isHover = true" @mouseleave=" isHover = false" @click="isClicked = !isClicked"
            :style="[isHover ? { backgroundPosition: 'left bottom' } : { backgroundPosition: 'right bottom' }]">
            <!-- <p class="order__box__text" v-html="props.content.text" v-if="$tvaMq == 'desktop' || $tvaMq == 'large'"></p> -->
            <img :src="`${$assetsBasePath}icons/news/${isClicked ? 'order-down' : 'order-up'}.svg`" />
        </div>
        <fieldset class="order__checkbox" v-if="isClicked">
            <div class="order__checkbox__check" v-for="choice in props.content.subtext" :key="choice.id">
                <input type="radio" ref="el" name="date" :value="choice.id" :checked="choice.id == orderChoice"
                    v-model="orderChoice" />
                <label :for="choice.text" v-html="choice.text"></label>
            </div>
        </fieldset>
    </div>
</template>

<script setup>
import { ref, watch } from "@vue/runtime-core";
import { onClickOutside } from '@vueuse/core';

const props = defineProps({
    content: Object,
});

const emit = defineEmits(['update-choice']);

const isHover = ref(false);
const isClicked = ref(false);
const orderChoice = ref(props.content.subtext[0].id);
const order = ref(null);


onClickOutside(order, e => {
    if (e) {
        isClicked.value = false;
    }

});


watch(orderChoice, (e) => {
    emit('update-choice', e);
});



</script>

<style lang="scss" scoped>
.order {
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
        background-size: 205% 100%;
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

        // p {
        //     @include paragraph-m;
        //     color: $color-white;
        //     transition: color 0.5s ease;
        //     padding-right: 1.25rem !important;



        // }

        img {
            filter: invert(50%) sepia(0%) saturate(0%) hue-rotate(133deg) brightness(1200%) contrast(90%) !important;
        }
    }

    &__checkbox {
        border: 1.5px solid $color-orange !important;
        background-color: $color-white;
        width: auto;
        position: absolute;
        right: -1.5px;
        padding: 1rem 1.375rem !important;


        &__check {
            padding: 0.3rem !important;
            display: flex;
            align-self: center;

            input {
                appearance: none;
                border: 2px solid $color-lightgrey !important;
                border-radius: 50%;
                width: 14px;
                height: 14px;
                transition: 0.2s all ease;
                margin-right: 5px;
                position: relative;
                cursor: pointer;

                &:checked {
                    border: 4px solid $color-orange !important;
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