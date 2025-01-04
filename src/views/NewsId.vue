<template>
    <div class="newsId">
        <div class="newsId__wrapper">
            <div class="newsId__wrapper__img">
                <img :src="props.content.dinamic.img" alt="">
            </div>
            <div class="newsId__wrapper__tags">
                <div class="newsId__wrapper__tags__tag" v-for="(tag, index) in props.content.dinamic.tag" :key="index"
                    v-html="tag"></div>
            </div>
            <div class="newsId__wrapper__title">
                <h1 v-html="props.content.dinamic.title"></h1>
            </div>
            <div class="newsId__wrapper__date">
                <p v-html="props.content.dinamic.date"></p>
            </div>
            <div class="newsId__wrapper__text">
                <p v-html="props.content.dinamic.text"></p>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    content: Object
});

// import { useRoute, useRouter } from 'vue-router'

// const router = useRouter();
// const route = useRoute();

//to delete query from address bar
// router.replace({ query: {} })


//props via router-link
// const content = JSON.parse(route.query.content);
// console.log(content);


</script>

<style lang="scss" scoped>
.newsId {
    width: 100%;
    padding: 0 3rem 0 3rem !important;

    &__wrapper {
        width: 100%;

        &__img {
            width: 100%;

            img {
                width: 100%;
                object-fit: cover;
            }

        }

        &__tags {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            gap: .5rem;
            padding: 1.5rem 0 1.5rem 0 !important;


            &__tag {
                @include news-details;
                padding: .5rem !important;
                border: 1px solid $color-orange !important;
                color: $color-orange;
            }
        }

        &__title {
            padding-bottom: .75rem !important;


            h1 {
                @include h1;
                line-height: 100%;
            }
        }

        &__date {
            width: 100%;
            p {
                @include section-style;
            }
        }

        &__text {
            p {
                padding: 1.5rem 0 1.5rem 0 !important;
                @include paragraph;
            }
        }
    }
}
</style>