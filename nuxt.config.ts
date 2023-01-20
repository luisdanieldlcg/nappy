// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/styles.scss"],
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    [
      "@pinia/nuxt",
      {
        autoImports: [
          // automatically imports `defineStore`
          "defineStore",
        ],
      },
    ],
  ],
});
