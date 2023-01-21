// plugins/vuetify.js
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import { ThemeDefinition } from "vuetify/lib/index";

const lightTheme: ThemeDefinition = {
  colors: {
    background: "#f9fafb",
    muted: "#8d97ad",
    primary: "#EB455F",
    "card-red-icon-bg": "#FAD4D4",
    "card-red-icon": "#F94C66",
    "card-red-accent": "#F55050",
    "card-aqua-icon-bg": "#b0cbeb",
    "card-aqua-icon": "#103996",
    "card-aqua-accent": "#04297a",
  },
};
export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      themes: {
        light: lightTheme,
      },
    },
    icons: {
      defaultSet: "mdi",
      aliases,
      sets: {
        mdi,
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
