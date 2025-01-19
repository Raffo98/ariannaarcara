<template>
    <div class="gallery">
        <div v-if="dataReady">
            <PriceFilter />
            <div class="gallery__wrapper">
                <GalleryBox v-for="(product, idx) in filteredData" :key="idx" :product="product" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "@vue/runtime-core";

import GalleryBox from "@/components/galleryBox.vue";
import PriceFilter from "@/components/filterButton.vue";
import { useStateStore } from "@/utilities/store/store";
import { watch } from "@vue/runtime-core";
import { useRoute } from 'vue-router'
import { computed } from "vue";

const route = useRoute();
const props = defineProps({
    data: Array,
    // filter: String
});



const filter = computed(() => {
    if (route.params.filter) {
        return route.params.filter;

    }
    else {
        console.log("AO")
        return "";
    }
})

const minmax = useStateStore();
const dataReady = ref(false);
const filterCheck = ref();





// watch(() => filter.value, () => {
//     fetchData();
//     filterCheck.value = filter.value;
// });


// watch(() => minmax.partialMax, () => {
//     fetchData();
// });

// watch(() => minmax.partialMin, () => {
//     fetchData();
// });




watch(() => [filter.value, minmax.partialMax, minmax.partialMin], ([newFilter]) => {
    fetchData();
    filterCheck.value = newFilter;
});

// Variabili di stato per i dati filtrati, minPrice e maxPrice
const filteredData = ref([]);
const minPrice = ref(0);
const maxPrice = ref(0);

// Funzione asincrona per ottenere i dati filtrati e calcolare minPrice/maxPrice
const fetchFilteredData = async () => {
    try {
        // Funzione per filtrare i prodotti per prezzo
        const filterByPrice = (product) => {
            const [productMinPrice, productMaxPrice] = product.product.price || [0, 0];

            return (
                productMinPrice <= minmax.partialMax && productMaxPrice >= minmax.partialMin
            );
        };
        // Filtra i dati basandosi su categoria e prezzo
        const result = props.data.filter((product) => {
            const matchesCategory = filter.value
                ? product.category === filter.value
                : true; // Se non c'è filtro categoria, accetta tutti
            const matchesPrice = filterByPrice(product);

            return matchesCategory && matchesPrice;
        });


        // Ritorna i dati filtrati
        filteredData.value = result;
        return result;

        // if (!props.data || !props.data.length) {
        //     // Se non ci sono dati, ritorna un array vuoto
        //     filteredData.value = [];
        //     minPrice.value = null;
        //     maxPrice.value = null;
        //     return;
        // }

        // // Funzione per filtrare per prezzo
        // const filterByPrice = (product) => {
        //     const [productMinPrice, productMaxPrice] = product.product.price || [0, 0];
        //     return productMinPrice <= minmax.max && productMaxPrice >= minmax.min;
        // };


        // // Filtra i dati in base alla categoria e al prezzo
        // const filtered = props.filter
        //     ? props.data.filter(
        //         (product) =>
        //             product.category === props.filter && filterByPrice(product)
        //     )
        //     : props.data.filter(filterByPrice);

        // // Calcola i prezzi minimi e massimi
        // const allPrices = filteredData.value.flatMap((item) => item.product.price);
        // minPrice.value = allPrices.length ? Math.min(...allPrices) : null;
        // maxPrice.value = allPrices.length ? Math.max(...allPrices) : null;

        // // Imposta i dati filtrati
        // filteredData.value = filtered;
        // console.log(filteredData.value)
        //   try {
        //     // Funzione per filtrare i prodotti per prezzo
        //     const filterByPrice = (product) => {
        //       const [productMinPrice, productMaxPrice] = product.product.price || [0, 0];
        //       return (
        //         productMinPrice <= maxPrice.value && productMaxPrice >= minPrice.value
        //       );
        //     };

        //     // Filtra i dati basandosi su categoria e prezzo
        //     const result = props.data.filter((product) => {
        //       const matchesCategory = props.filter
        //         ? product.category === props.filter
        //         : true; // Se non c'è filtro categoria, accetta tutti
        //       const matchesPrice = filterByPrice(product);

        //       return matchesCategory && matchesPrice;
        //     });

        //     // Ritorna i dati filtrati
        //     return result;
    } catch (error) {
        console.error("Errore durante il filtraggio dei dati:", error);
        return []; // Ritorna un array vuoto in caso di errore
    }
};

// Chiamata a fetchFilteredData quando il componente è montato
// onMounted(() => {
//     fetchFilteredData();
// });
const fetchData = async () => {

    try {
        // // Calcola i prezzi minimi e massimi
        // const allPrices = props.data.flatMap((item) => item.product.price);
        // minPrice.value = allPrices.length ? Math.min(...allPrices) : null;
        // maxPrice.value = allPrices.length ? Math.max(...allPrices) : null;
        // if (minmax.min == 0 || minmax.max == 0) {
        //     // console.log("we",);
        //     // console.log(props.min, props.max)
        //     minmax.updateMinMax(minPrice.value, maxPrice.value);
        //     // console.log(minmax.min)

        // }


        // Calcola i prezzi minimi e massimi
        const filteredItems = filter.value
            ? props.data.filter((item) => item.category === filter.value)
            : props.data;


        const allPrices = filteredItems.flatMap((item) => item.product.price);
        minPrice.value = allPrices.length ? Math.min(...allPrices) : null;
        maxPrice.value = allPrices.length ? Math.max(...allPrices) : null;


        minmax.updateMinMax(minPrice.value, maxPrice.value);

        if (minmax.partialMin == 0 || minmax.partialMax == 0 || filterCheck.value != filter.value) {
            minmax.updatePartialMinMax(minPrice.value, maxPrice.value);
        }


        await fetchFilteredData();

        dataReady.value = true;
    }
    catch (error) {
        console.error(error);
    }
}

onMounted(() => {
    fetchData();
});



</script>

<style lang="scss" scoped>
.gallery {
    width: 100%;
    display: flex;
    flex-direction: column;

    &__wrapper {
        display: flex;
        flex-direction: row;
        width: 100%;
        flex-wrap: wrap;
        gap: 2.5rem;
        justify-content: flex-start;


    }
}
</style>