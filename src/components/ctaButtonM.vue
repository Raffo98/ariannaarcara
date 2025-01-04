<template>
    <div class="cta" @mouseover="isHover = true" @mouseleave=" isHover = false" @click="handleClick"
        :style="[isHover ? { backgroundPosition: 'left bottom' } : { backgroundPosition: 'right bottom' }]">
        <button :class="{
            cta__button: true,
        }">
            <div class="cta__button__box">
                <p class="cta__button__box__text" v-html="props.content.text"
                    :style="[isHover ? { color: 'rgba(231, 83, 23, 1)' } : { color: 'rgba(247, 247, 247, 1)' }]"></p>
            </div>
            <div class="cta__button__box__icon"
                :style="[isHover ? { backgroundColor: 'rgba(231, 83, 23, 1)' } : { backgroundColor: 'rgba(247, 247, 247, 1)' }]">
                <img :src="`${$assetsBasePath}icons/${props.content.icon}.svg`" :class="{ 'onHover': isHover }" />
            </div>
        </button>
    </div>
</template>

<script setup>
import { ref } from "@vue/runtime-core";
import { useRouter } from 'vue-router';

const route = useRouter();

const props = defineProps({
    content: Object,
});

const isHover = ref(false);

const handleClick = () => {
    if(props.content.function.type == 'mail') {
        window.location.href = props.content.function.link;
    }
    else if(props.content.function.type == 'page'){
        route.push(props.content.function.link);
    }
}

</script>

<style lang="scss" scoped>
.cta {
    border: 1.5px solid $color-orange !important;
    // background-color: $color-white;
    position: relative;
    transition: width 0.3s ease;
    background: linear-gradient(to right, $color-white 50%, $color-orange 50%);
    background-size: 200% 100%;
    // background-position:left bottom;
    transition: all 0.8s ease;

    &__button {
        display: flex;
        align-items: center;
        height: 41px;
        width: fit-content;

        // background-color: $color-orange !important;
        &__box {
            display: flex;
            align-items: center;


            &__text {
                white-space: nowrap;
                padding: 8px 16px !important;
                @include paragraph-m;
                color: $color-white;
                text-transform: uppercase;
                transition: color 0.5s ease;
            }

            &__icon {
                border-left: 1.5px solid $color-orange !important;
                width: 41px;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background-color 0.5s ease;

                img {
                    filter: invert(45%) sepia(50%) saturate(2400%) hue-rotate(360deg) brightness(81%) contrast(99%);
                    transition: filter 0.3s ease;
                }
            }
        }
    }
}

.onHover {
    filter: invert(50%) sepia(0%) saturate(0%) hue-rotate(133deg) brightness(1200%) contrast(90%) !important;
}
</style>