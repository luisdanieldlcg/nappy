// plugins/vuetify.js
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";
import { ThemeDefinition } from "vuetify/vuetify";

const lightTheme: ThemeDefinition = {
  colors: {
    background: "#fcfcfc",
    muted: "#8d97ad",
    primary: "#212121",
    dark: "#212121",
    surface: "#FFFFFF",
    surfaceBorder: "#e9e8e8",
    "card-subtitle": "#6b7280",
    "grey-subtitle": "#35393b",
  },
};
const darkTheme: ThemeDefinition = {
  colors: {
    muted: "#6b7385",
    "card-red-icon-bg": "#FAD4D4",
    "card-red-icon": "#F94C66",
    "card-red-accent": "#F55050",
    "card-aqua-icon-bg": "#b0cbeb",
    "card-aqua-icon": "#103996",
    "card-aqua-accent": "#04297a",
    "card-green-icon-bg": "#D7E9B9",
    "card-green-icon": "#5F8D4E",
    "card-green-accent": "#61876E",
  },
};
export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components: {
      ...components,
    },
    directives,
    icons: {
      defaultSet: "mdi",
      aliases,
      sets: {
        mdi,
      },
    },
    theme: {
      themes: {
        light: lightTheme,
        dark: darkTheme,
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
