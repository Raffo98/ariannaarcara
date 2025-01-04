<template>
    <div class="modal" @click="toggleAccordion">
        <div class="accordion">
            <div class="accordion__header">
                <div class="accordion__arrow"><img :class="{ rotate: isOpen }"
                        :src="`${$assetsBasePath}/icons//arrow.svg`"></div> <!-- Freccia destra -->
                <div class="accordion__title">Titolo dell'Accordion</div>
            </div>
            <div class="accordion__content" :class="{ open: isOpen }">
                <p>Questo è il testo del contenuto dell'accordion. Puoi aggiungere qualsiasi cosa qui.</p>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref } from 'vue';

// const props = defineProps({
//     content: Object,
// });

const isOpen = ref(false);

const toggleAccordion = () => {
    isOpen.value = !isOpen.value;
    console.log(isOpen.value);
};

</script>

<style lang="scss" scoped>
/* Stile del modale */
.modal {
    cursor: pointer;

}

/* Accordion container */
.accordion {
    overflow: hidden;

    &__header {
        padding: 1rem;
    }

    &__title {}

    &__arrow {

        transition: transform 0.3s ease;


        /* Animazione della rotazione */
    }

    &__content {
        display: none;
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