<template>
    <div class="cv">
        <div class="cv__bio" v-html="props.content.bio"></div>
        <div class="cv__pic">
            <img :src="`${$assetsBasePath}/cv/arianna.jpg`" alt="">
            <div class="cv__pic__copyright" v-html="props.content.copyright"></div>
        </div>
        <div class="cv__exhibitions">
            <div class="cv__exhibitions__title" v-html="props.content.title"></div>
            <div class="cv__exhibitions__sections" v-for="(section, id) in props.content.exhibitions" :key="id">
                <div class="cv__exhibitions__sections__year" v-html="section.year"></div>
                <div class="cv__exhibitions__sections__exhibition" v-for="(exhibition, id) in section.exhibition" :key="id">
                    <div class="cv__exhibitions__sections__exhibition__text" v-html="exhibition.title"></div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>

const props = defineProps({
    content: Object
});


</script>

<style lang="scss" scoped>
.cv {
    width: 100%;
    display: flex;
    flex-direction: column;
    max-width: calc(100% - 35rem);

    &__bio {
        width: 100%;
        @include text-SS;
        line-height: 160%;
        padding-bottom: 2rem !important;
    }
    &__pic {
        width: 100%;
        padding-bottom: 2rem !important;


        img {
            width: 100%;
        }

        &__copyright {
            width: 100%;
            text-align: right;
            @include text-SS;
        }
    }
    &__exhibitions {
        width: 100%;
        @include text-S;

        &__title {
            width: 100%;
            border-bottom: 1.5px solid $color-black !important;
            padding-bottom: 1.5rem !important;


        }

        &__sections {
            width: 100%;
            border-bottom: 1.5px solid $color-black !important;

            &__year {
                padding-top: 1.5rem !important;
                padding-bottom: 2rem !important;

            }

            &__exhibition {
                padding-bottom: 2rem !important;
                
            }

        }

        &__sections:last-child {
            border: none !important;

        }
    }

}
</style>