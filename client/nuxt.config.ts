// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/styles.scss"],

  build: {
    transpile: ["vuetify", "maz-ui"],
  },
  ssr: false,
  modules: [
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "storeToRefs"],
      },
    ],
    "nuxt-icon",
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
