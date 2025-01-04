<template>
    <div class="search">
        <label class="input-lb" @mouseover="isHover = true" @mouseleave=" isHover = false">
            <input class="input-box" ref="el" type="text" :placeholder="props.content.text" v-model="inputText" @focusin="isFocused = true" @focusout="isFocused = false"
                :style="[isHover || isFocused || inputText.length > 0 ? { backgroundPosition: 'left bottom' } : { backgroundPosition: 'right bottom' }]" />
        </label>
    </div>
</template>

<script setup>
import { ref, watch } from "@vue/runtime-core";

const props = defineProps({
    content: Object,
});

const emit = defineEmits(['update-input']);

const isHover = ref(false);
const isFocused = ref(false);

const inputText = ref('');


watch(inputText, (e) => {
 emit('update-input', e);
});



</script>

<style lang="scss" scoped>
.search {
    input[type=text] {
        width: 100%;
        position: relative;
        box-sizing: border-box;
        height: 41px;
        border: 1.5px solid $color-orange !important;
        background: linear-gradient(to right, $color-white 50%, $color-orange 50%);
        background-size: 200% 100%;
        padding: 8px 16px !important;
        transition: all 0.8s ease;
        color: $color-orange;
        @include paragraph-m;
        text-transform: lowercase !important;

        &:hover {
            &::placeholder {
                color: $color-orange;
            }
        }

        &:focus {
            &::placeholder {
                color: $color-orange;
            }
        }


        &:focus {
            outline: none;
        }

        &::placeholder {
            @include paragraph-m;
            color: $color-white;
            white-space: nowrap;
            transition: color 0.5s ease;
        }


    }
}
</style>