const install = function (Vue) {
  Vue.mixin({
    computed: {
      $retina: () => window.devicePixelRatio > 1,
      $touchDevice: () => "ontouchstart" in document.documentElement,
      $baseUrl: () => process.env.BASE_URL,
      $assetsBasePath: () => document.querySelector('#app').getAttribute('assets-base-path') || process.env.VUE_APP_PATH || '' 
    },
  });
};

export default install;