// const PrerenderSPAPlugin = require("prerender-spa-plugin-next");

// console.log("vue.config.js");

// const webpack = require("webpack");
// const process = require("process");

// const {defineConfig} = require('@vue/cli-service');
// // const path = require("path");


// module.exports = {
//   transpileDependencies: true,
//   // publicPath: process.env.NODE_ENV === 'production' ? '/ariannaarcara/' : '/',
//   publicPath: '/ariannaarcara/',
//   outputDir: "dist",
//   configureWebpack: {
//     resolve: {
//       fallback: {
//         http: require.resolve("stream-http"),
//         path: require.resolve('path-browserify'),
//         crypto: require.resolve('crypto-browserify'),
//         stream: require.resolve('stream-browserify'),
//         os: require.resolve('os-browserify'),
//         process: require.resolve('process/browser'),
//         url: require.resolve("url"),
//         assert: require.resolve("assert")
//       },
//     },
//     plugins: [
//       new webpack.ProvidePlugin({
//         process: 'process/browser', // Polyfill per `process`
//         Buffer: ['buffer', 'Buffer'], // Polyfill per `Buffer`
//         'process.env': {
//           VUE_APP_API_KEY: JSON.stringify(process.env.VUE_APP_API_KEY),
//         },
//       }),
//     ],
//     plugins: [
//       // Define Bundler Build Feature Flags (This helps for tree shaking)
//       new webpack.DefinePlugin({
//         __VUE_I18N_FULL_INSTALL__: true,
//         __VUE_I18N_LEGACY_API__: true,
//         __INTLIFY_PROD_DEVTOOLS__: true,
//         __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
//         'process.env': JSON.stringify(process.env),
//       }),
//     ],
//     optimization: {
//       splitChunks: false,
//     },
//     output: {
//       filename: "js/app.[hash].js",
//     },
//   },
//   // To load sass files, you have to use this config:
//   css: {
//     extract: false,
//     loaderOptions: {
//       sass: {
//         additionalData: `
//         @import "@/assets/scss/reset.scss"; @import "@/assets/scss/styles.scss";`,
//       },
//     },
//   },
//   productionSourceMap: false
// };


const webpack = require("webpack");

module.exports = {
  transpileDependencies: true,
  publicPath: '/ariannaarcara/', // Corretto per GitHub Pages
  outputDir: "dist",
  
  configureWebpack: {
    resolve: {
      fallback: {
        http: require.resolve("stream-http"),
        path: require.resolve("path-browserify"),
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        os: require.resolve("os-browserify"),
        url: require.resolve("url"),
        assert: require.resolve("assert"),
      },
    },
    plugins: [
      // Polyfill per `process` e `Buffer`
      new webpack.ProvidePlugin({
        process: "process/browser",
        Buffer: ["buffer", "Buffer"],
      }),

      // Definizione delle variabili d'ambiente per Vue
      new webpack.DefinePlugin({
        "process.env": {
          VUE_APP_API_KEY: JSON.stringify(process.env.VUE_APP_API_KEY), // Polyfill per la tua API Key
          NODE_ENV: JSON.stringify(process.env.NODE_ENV), // Ambiente (production/development)
        },
      }),
    ],
    optimization: {
      splitChunks: false, // Per generare un unico file JS
    },
    output: {
      filename: "js/app.[hash].js", // Nome del file JS generato
    },
  },

  // Configurazione CSS
  css: {
    extract: false,
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/scss/reset.scss";
          @import "@/assets/scss/styles.scss";
        `,
      },
    },
  },

  // Disabilita i sourcemap in produzione
  productionSourceMap: false,
};
