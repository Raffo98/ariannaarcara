<template>
  <div class="about">
    <div class="about__title">
      <h1 v-html="props.content.title"></h1>
    </div>
    <div class="about__text" v-html="props.content.text"></div>
    <div class="about__image">
      <img :src="`${$assetsBasePath}about/${props.content.image}.jpg`">
    </div>
    <div class="about__sections" v-for="section, id in props.content.sections" :key="id">
      <div class="about__sections__section">
        <div class="about__sections__section__subtitle">
          <h2 v-html="section.title" :style="{ textTransform: section.id === 'cvsender' ? 'uppercase' : 'lowercase' }">
          </h2>
        </div>
        <div class="about__sections__section__text" v-html="section.text"></div>
        <div class="about__sections__section__certificate" v-if="section.id == 'certificate'">
          <ctaButtonM :content="section.button" />
        </div>
        <div class="about__sections__section__team" v-if="section.id == 'team'">
          <teamCard v-for="(person, idx) in teamDb" :key="idx" :content="person"
            :titles="props.content.sections[1].cards.titles" />
        </div>
      </div>
    </div>
    <div class="about__cta">
      <div class="about__cta__title">
        <p v-html="props.content.cta.title"></p>
      </div>
      <ctaButtonL :content="props.content.cta.button" />
    </div>
  </div>
</template>

<script setup>
import airtable from "@/plugins/airtable.js";
import { ref } from "@vue/runtime-core";
// import axios from 'axios';

import teamCard from "@/components/teamCard.vue";
import ctaButtonM from "@/components/ctaButtonM.vue";
import ctaButtonL from "@/components/ctaButtonL.vue";



const props = defineProps({
  content: Object,
});


// var app_id = "appVMoyb4khjMiISW";
// var api_key = "keyZ04O2juXZ975sl";

// axios.get(
//   "https://api.airtable.com/v0/" + app_id + "/team?api_key=" + api_key, {
//   headers: {
//     Authorization: "Bearer " + api_key
//   }
// }
// ).then(function (response) {
//   console.log(response.data.records);
//   teamDb.value = response.data.records;

// }).catch(function (error) {
//   console.log(error)
// })

// airtable.base('team').select({}).eachPage(function page(records, fetchNextPage) {

//     records.forEach(function(record) {
//         teamDb.value.push(record.fields); 
//     });

//  fetchNextPage();
// })

// console.log(teamDb.value);
const teamDb = ref([]);

const fetchTeamData = () => {
  airtable.base('team').select({}).eachPage(function page(records, fetchNextPage) {
    records.forEach(async function (record) {
      await teamDb.value.push({ "id": record.fields.order, "name": record.fields.name, "role": record.fields.role, "mail": record.fields.mail, "phone": record.fields.phone, "pic": record.fields.pic ? record.fields.pic[0].url : undefined, "certificate": record.fields.certificate });
    });

    fetchNextPage();
  }, function done(err) {
    if (err) { console.error(err); return; }
    teamDb.value.sort((a, b) => a.id - b.id);
  });

  
};

fetchTeamData();




</script>


<style lang="scss" scoped>
.about {
  width: 100%;
  padding: 3rem 3rem 0 3rem !important;

  .mobile & {
    padding: 0 1rem 0 1rem !important;
  }



  &__title {
    h1 {
      @include h1;
      line-height: 100% !important;
      text-transform: uppercase;
      color: $color-black;
      padding-bottom: 3rem !important;

      .mobile & {
        line-height: 100% !important;
        padding: 3rem 0rem !important;
      }
      .tablet & {
        line-height: 100% !important;
        padding: 3rem 0rem !important;
      }

    }
  }

  &__text {
    padding-bottom: 2rem !important;
    @include paragraph;
    color: $color-black;
  }

  &__image {
    width: 100%;
    padding-bottom: 3rem !important;
    height: 50vh;

    img {
      object-fit: cover;
      min-width: 100%;
      max-width: 100%;
      height: 100%;

      .mobile & {
        min-width: auto;
        max-width: auto;
        height: 100%;
      }
    }
  }

  &__sections {
    width: 100%;

    &__section {
      width: 100%;
      &__subtitle {
        padding-bottom: 2rem !important;

        padding-bottom: 2rem !important;

        h2 {
          @include h2;
          color: $color-black;
          text-transform: lowercase;

          &::first-letter {
            text-transform: capitalize;
          }
        }
      }

      &__text {
        padding-bottom: 2rem !important;
        @include paragraph;
        color: $color-black;
      }

      &__certificate {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 3rem !important;

      }

      &__team {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1rem;
        padding-bottom: 3rem !important;
      }
    }
  }

  &__cta {
    padding: 2.25rem 0 12rem 0 !important;
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      @include h2;
      color: $color-lightgrey;
      text-align: center;
      text-transform: none;
      padding-bottom: 2rem !important;

      &::first-letter {
        text-transform: capitalize;
      }
    }
  }
}
</style>