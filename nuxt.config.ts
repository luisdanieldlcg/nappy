// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/styles.scss", "@mdi/font/css/materialdesignicons.min.css"],
  build: {
    transpile: ["vuetify"],
  },
  ssr: false,
  modules: [
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "storeToRefs"],
      },
    ],
  ],
  imports: {
    dirs: ["./stores"],
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
});
