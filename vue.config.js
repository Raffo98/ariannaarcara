// const PrerenderSPAPlugin = require("prerender-spa-plugin-next");

console.log("vue.config.js");

const webpack = require("webpack");
const process = require("process");
// const path = require("path");


module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/ariannaarcara/' : '/',
  outputDir: "dist",
  configureWebpack: {
    resolve: {
      fallback: {
        path: require.resolve('path-browserify'),
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        os: require.resolve('os-browserify'),
        process: require.resolve('process/browser'),

      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser', // Polyfill per `process`
        Buffer: ['buffer', 'Buffer'], // Polyfill per `Buffer`
        'process.env': {
          API_KEY: JSON.stringify(process.env.API_KEY),
        },
      }),
    ],
    plugins: [
      // Define Bundler Build Feature Flags (This helps for tree shaking)
      new webpack.DefinePlugin({
        __VUE_I18N_FULL_INSTALL__: true,
        __VUE_I18N_LEGACY_API__: true,
        __INTLIFY_PROD_DEVTOOLS__: true,
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
      }),
    ],
    optimization: {
      splitChunks: false,
    },
    output: {
      filename: "js/app.[hash].js",
    },
  },
  // To load sass files, you have to use this config:
  css: {
    extract: false,
    loaderOptions: {
      sass: {
        additionalData: `
        @import "@/assets/scss/reset.scss"; @import "@/assets/scss/styles.scss";`,
      },
    },
  },
  productionSourceMap: false
};
