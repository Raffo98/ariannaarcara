<template>
    <div class="filter" v-if="minmax.min != minmax.max">
        <div class="filter__button" @click="isOpen"
        :class="[minmax.isFilterOpen ? 'has-border' : '']">
            <div v-html="props.content.title"></div>
            <img :src="`${$assetsBasePath}icons/arrow-down.svg`" alt="" :class="{ rotate: minmax.isFilterOpen }" />

        </div>
        <div class="filter__box" ref="filter" v-show="minmax.isFilterOpen">
            <!-- {{ value }}
            {{ minmax.min }}
            {{ minmax.max }}
            {{ minmax.partialMin }}
            {{ minmax.partialMax }} -->
            <div class="filter__box__input">
                <div class="filter__box__input__cell"> <input type="number" :value="minmax.partialMin" :min="minmax.min"
                        :max="minmax.max" @input="inputHandlerTextMin">
                    <span>€</span>
                </div>
                -
                <div class="filter__box__input__cell">
                    <input type="number" :value="minmax.partialMax" :min="minmax.min" :max="minmax.max"
                        @input="inputHandlerTextMax">
                    <span>€</span>
                </div>
            </div>
            <vue-slider ref="slider" v-bind="options" v-model="value" :min="minmax.min" :max="minmax.max"
                :tooltip="'none'" @change="inputHandler" :enable-cross="false" :process="true"
                :lazy="true"></vue-slider>
        </div>
    </div>


</template>

<script setup>
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';
import { useStateStore } from "@/utilities/store/store";
import { watch, ref } from "@vue/runtime-core";
import { onClickOutside } from '@vueuse/core';

const props = defineProps({
    data: Array,
    content: Object
    // filter: String
});


const minmax = useStateStore();
const slider = ref(null);
const filter = ref(null);
const options = ref({
    dotOptions: [
        {
            style: {
                backgroundColor: "#000",
                boxShadow: "none",
            },
        },
        {
            style: {
                backgroundColor: "#000",
                boxShadow: "none",
            },
        },
    ],
});

onClickOutside(filter, () => { if (minmax.isFilterOpen) { minmax.updateFilterState(false) } });


function isOpen() {
    minmax.updateFilterState(minmax.isFilterOpen);
}

function inputHandler(e) {
    // minmax.updateMinMax(props.min, props.max);
    console.log(e);
    minmax.updatePartialMinMax(e[0], e[1]);
}

function inputHandlerTextMin(e) {
    if (e.target.valueAsNumber >= minmax.min) {
        minmax.updatePartialMinMax(e.target.valueAsNumber, minmax.partialMax);
        // inputHandler([e.target.valueAsNumber, minmax.partialMax]);
        value.value = [e.target.valueAsNumber, minmax.partialMax];
    }
}

function inputHandlerTextMax(e) {
    console.log(e.target.valueAsNumber);
    if (e.target.valueAsNumber <= minmax.max) {
        minmax.updatePartialMinMax(minmax.partialMin, e.target.valueAsNumber);
        // inputHandler([minmax.partialMin, e.target.valueAsNumber]);
        value.value = [minmax.partialMin, e.target.valueAsNumber];
    }

    // minmax.updatePartialMinMax(e[0], e[1]);
}


watch(() => minmax.min, () => {
    value.value = [minmax.min, minmax.max];
});


// Variabili reattive
const value = ref([minmax.min, minmax.max]);

</script>





<style lang="scss" scoped>
.filter {
    width: 100%;
    cursor: 'pointer';
    height: 48px;
    margin-bottom: 2rem !important;
    display: flex;
    justify-content: flex-end;
    position: relative;

    &__button {
        @include text-SS;
        position: absolute;
        width: 100px;
        background-color: $color-white;
        height: 48px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border: 1.5px solid $color-black !important;
        box-sizing: border-box !important;
        z-index: 2;
        cursor: pointer;
    }

    &__box {
        position: absolute;
        top: 46.3px;
        border: 1.7px solid $color-black !important;
        padding: 2.25rem 1rem !important;
        width: 300px;
        z-index: 0;
        background-color: $color-white;
        box-sizing: border-box;

        &__input {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding-bottom: 2rem !important;
            gap: 1rem !important;
            align-items: center;

            &__cell {
                width: 100%;
                border: 1.7px solid $color-black !important;
                @include text-SS;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 .5rem 0 .5rem !important;
            }

            input {
                width: 100%;
                border: 0 !important;
            }
        }
    }
}

:deep(.vue-slider-rail) {
    height: 4px !important;
    background-color: grey !important;
}

:deep(.vue-slider-process) {
    height: 4px !important;
    background-color: $color-black;
}

:deep(.vue-slider-dot-tooltip-inner) {
    background-color: $color-black;
    @include text-SSS;
}

:deep(.vue-slider-dot-tooltip-text) {
    padding: .2rem !important;
}

/* Per Webkit browsers (Chrome, Safari, Edge) */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Per Firefox */
input[type="number"] {
    -moz-appearance: textfield;
    height: 48px;
    @include text-SS;


}

input[type="number"]::after {
    transform: translateY(-50%);
    font-size: 16px;
}

input[type="number"]:focus {
    outline: none;
}

.rotate {
    transform-origin: center;
    transform: rotate(180deg);

}

.has-border {
  border-bottom: 1px solid white !important;
}
</style>