<template>
  <div class="carousel">
    <div class="carousel__main" ref="rectMain">
      <div class="carousel__main__overlay">
        <button class="carousel__main__overlay__arrows" v-for="arrow, index in props.content.button.icons" :key="index"
          @mouseover="handleArrowHover(arrow)" @mouseleave="isHover = false, activeArrow = ''" @click="slideTo(arrow)"
          :style="[isHover ? { backgroundPosition: 'left bottom' } : { backgroundPosition: 'right bottom' }]">
          <div class="carousel__main__overlay__arrows__button">
            <div class="carousel__main__overlay__arrows__button__icon"
              :style="[isHover && activeArrow == arrow ? { backgroundColor: 'rgba(247, 247, 247, 1)' } : { backgroundColor: 'rgba(231, 83, 23, 1)' }]">
              <img :src="`${$assetsBasePath}icons/gallery/${arrow}.svg`"
                :class="{ 'onHover': isHover && activeArrow == arrow }" />
            </div>
          </div>
        </button>
      </div>
      <div class="carousel__main__strip" ref="strip">
        <div class="carousel__main__strip__box" v-for="image, index in props.content.length" :key="index">
          <img :src="`${$assetsBasePath}gallery/${props.content.filename}-${index}.jpg`" alt="">
        </div>
      </div>
    </div>
    <div class="carousel__thumbnail" v-if="$tvaMq !== 'mobile'">
      <div class="carousel__thumbnail__box" :style="'color: red'">
        <img v-for="index in 2" :key="index"
          :src="`${$assetsBasePath}gallery/${props.content.filename}-${currentSlide + index >= props.content.length ? currentSlide % index : currentSlide + index }.jpg`"
          alt="">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, provide } from "@vue/runtime-core";
import useTvaMq from "@/plugins/tvaMq.js";

const props = defineProps({
  content: Object
});

const { $tvaMq } = useTvaMq();
provide("$tvaMq", $tvaMq);

const isHover = ref(false);
const activeArrow = ref('');
const rectMain = ref(null);
const strip = ref(null);
const currentSlide = ref(0);

const handleArrowHover = (arrow) => {
  isHover.value = true;
  activeArrow.value = arrow;
};

const updateStripWidth = () => {
  if (strip.value) {
    strip.value.style.transform = `translateX(${-currentSlide.value * strip.value.offsetWidth}px)`;
    // strip.value.style.transform = `translateX(${-currentSlide.value * rectMain.value.offsetWidth}px)`;
  }
};


const slideTo = (arrow) => {
  const totalImages = props.content.length;

  if (arrow === 'slide-right') {
    currentSlide.value = (currentSlide.value + 1) % totalImages;
  } else {
    currentSlide.value = (currentSlide.value - 1 + totalImages) % totalImages;
  }

  const transitionEndHandler = () => {
    strip.value.style.transition = 'none';
    strip.value.style.transform = `translateX(${-currentSlide.value * strip.value.offsetWidth}px)`;
    void strip.value.offsetWidth; // Trigger reflow
    strip.value.style.transition = ''; // Re-enable transition
    strip.value.removeEventListener('transitionend', transitionEndHandler);
  };

  strip.value.addEventListener('transitionend', transitionEndHandler);
  strip.value.style.transition = 'transform 0.5s ease';
  strip.value.style.transform = `translateX(${-currentSlide.value * strip.value.offsetWidth}px)`;
};


onMounted(() => {
  updateStripWidth();
  window.addEventListener("resize", updateStripWidth);
});



</script>

<style lang="scss" scoped>
.carousel {
  height: 100%;
  padding: 3rem !important;
  display: flex;
  flex-direction: row;
  gap: 1rem;

  .mobile & {
    padding: 1rem !important;

  }


  &__main {
    max-width: 70%;
    height: 100%;
    overflow: hidden;
    position: relative;
    
    .mobile & {
      max-width: 100%;
    }

    &__overlay {
      display: flex;
      justify-content: space-between;
      position: absolute;
      left: 0;
      bottom: 50%;
      width: 100%;
      height: auto;
      padding: 0 1rem !important;
      z-index: 1;


      &__arrows {
        border: 1.5px solid $color-white !important;
        position: relative;
        transition: width 0.3s ease;
        background: linear-gradient(to right, $color-orange 50%, $color-white 50%);
        transition: all 0.8s ease;
        width: 41px;

        &:hover {
          border: 1.5px solid $color-orange !important;
        }


        &__button {
          display: flex;
          height: 41px;
          width: 100%;

          &__icon {
            width: 75px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.5s ease;

            img {
              transition: filter 0.3s ease;
              filter: invert(50%) sepia(0%) saturate(0%) hue-rotate(133deg) brightness(1200%) contrast(90%);
            }
          }
        }
      }
    }

    &__strip {
      display: flex;
      flex-direction: row;
      height: 100%;
      width: 100%;
      // position: absolute;
      transition: transform .5s ease;


      &__box {
        min-width: 100%;
        height: 100%;
        overflow: hidden;
        color: red;


        img {
          height: 100%;
          width: 100%;
          object-fit: cover; // Adatta l'immagine senza deformarla
        }
      }

    }
  }

  &__thumbnail {
    min-width: 30%;
    max-height: 100%;


    &__box {
      min-width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 1rem;
      height: 100%;
      overflow: hidden;

      img {
        height: 50%;
        width: 100%;
        object-fit: cover; // Adatta l'immagine senza deformarla
      }


    }
  }
}

.onHover {
  filter: invert(45%) sepia(50%) saturate(2400%) hue-rotate(360deg) brightness(81%) contrast(99%) !important;
}
</style>