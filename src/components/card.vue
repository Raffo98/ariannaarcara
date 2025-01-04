<template>
    <div :class="{ card: true, onHover: isHover }" @mouseover="isHover = true" @mouseleave=" isHover = false"
        :style="[isHover ? { backgroundPosition: 'left bottom' } : { backgroundPosition: 'right bottom' }]">
        <button class="card__btn">
            <div class="card__btn__title">
                <p v-html="props.content.title"></p>
            </div>
            <div class="card__btn__subtitle">
                <p v-html="props.content.subtitle"></p>
            </div>
        </button>
    </div>
</template>

<script setup>
import { ref } from "@vue/runtime-core";

const isHover = ref(false);

const props = defineProps({
    content: Object,
});

</script>

<style lang="scss" scoped>
.card {
    width: calc(50% - 0.5rem);
    padding: 2.25rem !important;
    background: linear-gradient(to right, $color-orange 50%, $color-black 50%);
    background-size: 200% 100%;
    transition: background 0.6s ease, outline 0.2s linear, outline-offset 0.2s linear;
    outline: 1px solid $color-white;
    outline-offset: -1px;
    cursor: pointer !important;

    .mobile & {
        width: 100%;
        padding: 1rem !important;
    }

    
    &__btn {
        width: 100%;
        text-align: left;

        &__title {
            @include text;
            text-transform: uppercase;
            color: $color-white;
            padding-bottom: .75rem !important;
        }

        &__subtitle {
            @include paragraph;
            color: $color-white;

            &::first-letter {
                text-transform: capitalize;
            }
        }
    }
}

.onHover {
    outline-width: 5px !important;
    outline-offset: -5px !important;

}
</style>