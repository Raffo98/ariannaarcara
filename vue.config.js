const webpack = require("webpack");

module.exports = {
  transpileDependencies: true,
  // publicPath: '/ariannaarcara/', // Corretto per GitHub Pages
  publicPath: '/', // Corretto per GitHub Pages
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
