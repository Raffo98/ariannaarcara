<template>
    <div class="footer">
        <div class="footer__box">
            <div class="footer__box__contacts" v-for="(section, idx) in props.content.sections" :key="idx">
                <a :href="section.link">
                    <p v-html="section.title"></p>
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>


const props = defineProps({
    content: Array,
});


</script>

<style lang="scss" scoped>
.footer {
    position: fixed;
    /* Fissa gli elementi alla pagina */
    width: 100%;
    left: 9rem;
    right: 9rem;
    position: fixed;
    bottom: 0;
    z-index: 3;
    height: 55px;
    background-color: $color-white;

    &__box {
        width: calc(100% - 18rem);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        height: 70px;

        &__contacts {
            p {
                @include header;
                color: $color-black;
            }
        }
    }

}
</style>