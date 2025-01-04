<template>
    <div class="wrapper">

    </div>
</template>

<script setup>
import useTvaMq from "@/plugins/tvaMq.js";
import { provide, ref, watch } from "@vue/runtime-core";
import { useStateStore } from '@/utilities/store/store';

const { $tvaMq } = useTvaMq();
provide("$tvaMq", $tvaMq);

// const props = defineProps({
//     content: Object
// });

const stateModal = useStateStore();
// const isHover = ref(false);
const stateHover = ref(false);

watch(
    stateModal, () => {
        if(stateModal.onHover != stateHover.value) {
            stateHover.value = stateModal.onHover;
        }
    },
);

</script>

<style lang="scss" scoped>
.wrapper {
}
</style>