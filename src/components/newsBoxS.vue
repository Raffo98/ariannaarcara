<template>
    <div class="box">
        <router-link :to="{ name: 'newsId', params: { id: `${props.content.id}` } }">
            <div class="box__img">
                <img :src="props.content.img">
            </div>
            <div class="box__details">
                <div class="box__details__tag">
                    <p v-html="props.content.tag"></p>
                </div>
                <p class="box__details__split">•</p>
                <div class="box__details__date">
                    <p v-html="props.content.date"></p>
                </div>
            </div>
            <div class="box__title">
                <p v-html="props.content.title"></p>
            </div>
        </router-link>
    </div>
</template>

<script setup>

const props = defineProps({
    content: Object,
});

</script>

<style lang="scss" scoped>
.box {
    flex: 0 0 calc(33.33% - 1rem);
    max-width: calc(33.33% - 1rem);
    box-sizing: border-box;
    border: 1px solid $color-black !important;
    padding: 1rem !important;
    cursor: pointer;

    &__img {
        padding-bottom: 1.5rem !important;

        img {
            object-fit: cover;
            max-width: 100%;
            min-width: 100%;
            max-height: 250px;

        }
    }

    &__details {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        padding-bottom: .75rem !important;
        @include news-details;

        &__tag {
            color: $color-orange;
        }

        &__split {
            padding: 0 .25rem !important;
        }

        &__date {}
    }

    &__title {
        @include text;
        padding-bottom: 1rem !important;
    }

}
</style>