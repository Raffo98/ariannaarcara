<template>
    <div class="modal" @click="toggleAccordion">
        <div class="accordion">
            <div class="accordion__header">
                <div class="accordion__header__arrow"><img :class="{ rotate: isOpen }"
                        :src="`${$assetsBasePath}icons/arrow.svg`"></div> <!-- Freccia destra -->
                <div class="accordion__header__title" v-html="props.titles[0].text"></div>
            </div>
            <div class="accordion__content" :class="{ open: isOpen }">
                <div v-html="props.details[props.titles[0].id]"></div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    details: Object,
    titles: Object
});

const isOpen = ref(false);

const toggleAccordion = () => {
    isOpen.value = !isOpen.value;
};

</script>

<style lang="scss" scoped>
/* Stile del modale */
.modal {
    cursor: pointer;
    padding-top: 1.4rem !important;


}

/* Accordion container */
.accordion {
    overflow: hidden;

    &__header {
        width: 100%;
        display: flex;
        flex-direction: row;

        &__title {
            @include text-M;
        }

        &__arrow {
            transition: transform 0.3s ease;
        }
    }



    &__content {
        display: none;
        @include text-M;

    }


}

.open {
    display: block !important;
    /* Mostra il contenuto */
}

.rotate {
    transform-origin: center;
    transform: rotate(90deg);

}
</style>