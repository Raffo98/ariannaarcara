<template>
    <div class="filter" ref="filter" v-if="minmax.min != minmax.max">
        <!-- <div class="filter__box">
            <div class="filter__box__labels">
                <label for="min-price">Prezzo da</label>
                <input id="min-price" type="number" v-model="minPrice" />

                <label for="max-price">Prezzo fino a</label>
                <input id="max-price" type="number" v-model="maxPrice" />
            </div>
            <div class="filter__box__slider"></div>
        </div>
        <div class="slider">
            <input type="range" v-model="minPrice" :step="1" />
            <input type="range" v-model="maxPrice" :step="1" />
        </div> -->
        <!-- <div class="filter__box" @mouseover="isHover = true" @mouseleave=" isHover = false" @click="isClicked = !isClicked"
            :style="[isHover ? { backgroundPosition: 'left bottom' } : { backgroundPosition: 'right bottom' }]">
            <p class="filter__box__text" v-html="props.content.text" v-if="$tvaMq == 'desktop' || $tvaMq == 'large'"></p>
            <img :src="`${$assetsBasePath}icons/news/${props.content.icon}.svg`" />
        </div> -->
        <!-- <div class="box">
            <input v-model="value" @input="clearErrorMsg" />
            <span style="color: red; margin-left: 20px;">{{ errorMsg }}</span>
        </div> -->
        <!-- <vue-slider v-model="value" :min="props.minmax[0]" :max="props.minmax[1]"
            :tooltip="errorMsg ? 'none' : 'always'" :marks="[props.minmax[0], props.minmax[1]]" @error="handleError"
            @change="clearErrorMsg" :enable-cross="false" :process="true"></vue-slider> -->
        <div class="filter__box">
            {{ value }}
            {{ minmax.min }}
            {{ minmax.max }}
            {{ minmax.partialMin }}
            {{ minmax.partialMax }}
            <vue-slider v-model="value" :min="minmax.min" :max="minmax.max" :tooltip="'always'" @change="inputHandler"
                :enable-cross="false" :process="true" :interval="10" :lazy="true"></vue-slider>
        </div>
    </div>


</template>

<script setup>
// import { ref } from 'vue';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';
import { useStateStore } from "@/utilities/store/store";
import { watch, ref } from "@vue/runtime-core";



// const props = defineProps({
//     min: Number,
//     max: Number,
// });


const minmax = useStateStore();


// if (minmax.min == 0 || minmax.max == 0) {
//     // console.log("we",);
//     // console.log(props.min, props.max)
//     minmax.updateMinMax(props.min, props.max);
//     // console.log(minmax.min)

// }

function inputHandler(e) {
    // minmax.updateMinMax(props.min, props.max);
    minmax.updatePartialMinMax(e[0], e[1]);
}


watch(() => minmax.min, () => {
    value.value = [minmax.min, minmax.max];
});



// Definizione dei tipi di errore
// const ERROR_TYPE = {
//     VALUE: 1,
//     INTERVAL: 2,
//     MIN: 3,
//     MAX: 4,
//     ORDER: 5,
// };

// Variabili reattive
const value = ref([minmax.min, minmax.max]);
// const value = minmax.minmax;
// const errorMsg = ref('');

// Metodi
// const handleError = (type, msg) => {
//     switch (type) {
//         case ERROR_TYPE.MIN:
//             // Logica per errore MIN
//             break;
//         case ERROR_TYPE.MAX:
//             // Logica per errore MAX
//             break;
//         case ERROR_TYPE.VALUE:
//             // Logica per errore VALUE
//             break;
//     }
//     errorMsg.value = msg;
// };

// const clearErrorMsg = () => {
//     errorMsg.value = '';
// };
</script>





<style lang="scss" scoped>
.filter {
    width: 10%;
}

.vue-slider-rail {
    background-color: red;
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
</style>