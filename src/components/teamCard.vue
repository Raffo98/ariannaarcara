<template>
    <div :class="{ teamcard: true, second: props.content.pic === undefined }">
        <div class="teamcard__main" v-if="props.content.pic">
            <div class="teamcard__main__image">
                <img :src="props.content.pic">
            </div>
            <div class="teamcard__main__info">
                <div class="teamcard__main__info__role">
                    <p v-html="props.content.role"></p>
                </div>
                <div class="teamcard__main__info__name">
                    <p v-html="props.content.name"></p>
                </div>
                <div class="teamcard__main__info__mail">
                    <p class="teamcard__main__info__mail__title" v-html="props.titles[0]"></p>
                    <p v-html="props.content.mail"></p>
                    <span>@efestotrattamenti.com</span>
                </div>
                <div class="teamcard__main__info__phone">
                    <p class="teamcard__main__info__phone__title" v-html="props.titles[1]"></p>
                    <p v-html="props.content.phone"></p>
                </div>
                <div class="teamcard__main__info__certificate" v-if="props.content.certificate">
                    <p class="teamcard__main__info__certificate__title" v-html="props.titles[2]"></p>
                    <p v-html="props.content.certificate"></p>
                </div>
            </div>
        </div>
        <div class="teamcard__second" v-else>
            <div class="teamcard__second__info">
                <div class="teamcard__second__info__role">
                    <p v-html="props.content.role"></p>
                </div>
                <div class="teamcard__second__info__name">
                    <p v-html="props.content.name"></p>
                </div>
                <div class="teamcard__second__info__certificate" v-if="props.content.certificate">
                    <p class="teamcard__second__info__certificate__title" v-html="props.titles[2]"></p>
                    <p v-html="props.content.certificate"></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    content: Object,
    titles: Array
});



</script>

<style lang="scss" scoped>
.teamcard {
    border: 1px solid $color-black !important;
    width: calc(50% - 0.5rem);
    padding: 1rem !important;

    .mobile & {
        width: 100%;
        flex-direction: column;
    }

    .tablet & {
        width: calc(33.9% - 1rem);
    }

    &__main {
        display: flex;
        flex-direction: row;

        .tablet & {
            flex-direction: column;
        }

        .mobile & {
            flex-direction: column;
        }

        &__image {
            width: 36%;
            min-height: 100%;

            .mobile & {
                width: 100%;
            }

            .tablet & {
                min-width: 100%;
                padding-bottom: 1rem !important;
            }

            img {
                object-fit: cover;
                float: left;
                width: 100%;
                min-height: 100%;

                .mobile & {
                    float: none;
                    width: 100%;

                }

                .tablet & {
                    min-width: 100%;
                }

            }
        }

        &__info {
            width: 64%;
            margin-left: 1rem !important;

            .mobile & {
                width: 100%;
                margin-left: 0 !important;
            }

            .tablet & {
                width: 100%;
                margin-left: 0 !important;
            }

            &__role {
                @include card-role;
                color: $color-black;
                padding-bottom: .25rem !important;


            }

            &__name {
                @include text;
                color: $color-black;
                text-transform: uppercase;
                padding-bottom: .25rem !important;

            }

            &__mail {
                @include section-style;
                font-size: 0.8rem !important;
                color: $color-black;
                padding-bottom: .25rem !important;


                &__title {
                    @include paragraph-m;
                    color: $color-orange;
                    text-transform: uppercase;
                    padding-bottom: .25rem !important;

                }

            }

            &__phone {
                @include section-style;
                color: $color-black;
                font-size: 0.8rem !important;
                padding-bottom: .25rem !important;


                &__title {
                    @include paragraph-m;
                    color: $color-orange;
                    text-transform: uppercase;
                    padding-bottom: .25rem !important;


                }

            }

            &__certificate {
                @include section-style;
                color: $color-black;
                font-size: 0.8rem !important;

                &__title {
                    @include paragraph-m;
                    color: $color-orange;
                    text-transform: uppercase;
                    padding-bottom: .25rem !important;


                }

            }
        }

    }

    &__second {
        &__info {
            width: 100%;
            text-align: left;

            .mobile & {
                width: 100%;

            }

            &__role {
                @include card-role;
                color: $color-black;
                padding-bottom: .25rem !important;
            }

            &__name {
                @include text;
                color: $color-black;
                text-transform: uppercase;
                padding-bottom: .25rem !important;

            }

            &__certificate {
                @include section-style;
                color: $color-black;
                font-size: 0.8rem !important;

                &__title {
                    @include paragraph-m;
                    color: $color-orange;
                    text-transform: uppercase;
                    padding-bottom: .25rem !important;


                }

            }

        }


    }

}

.second {
    min-width: calc(25% - 0.25rem) !important;

    .mobile & {
        width: 100%;
        flex-direction: column;
    }

    .tablet & {
        width: calc(33.9% - 1rem);
    }

}
</style>