<template>
  <div class="hello">
    <h1>{{ $t("pippo") }}</h1>
    <router-link :to="{ params: { lang: nextLocale } }"
      >switch to {{ nextLocale.toUpperCase() }}</router-link
    >
    <router-link :to="{ name: 'about' }">ABOUT</router-link>
    <router-link :to="''">NESTED</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  computed: {
    nextLocale() {
      const locales = this.$i18n.availableLocales;
      const currentLocaleIndex = locales.findIndex(
        (e) => e == this.$i18n.locale
      );
      const nextLocaleIndex =
        currentLocaleIndex < locales.length - 1 ? currentLocaleIndex + 1 : 0;

      return locales[nextLocaleIndex];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>