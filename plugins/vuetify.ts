// plugins/vuetify.js
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import { ThemeDefinition } from "vuetify/lib/index";

const lightTheme: ThemeDefinition = {
  colors: {
    muted: "#8d97ad",
    primary: "#212121",
    dark: "#212121",
    surface: "#f6f8fc",
  },
};

const darkTheme: ThemeDefinition = {
  colors: {
    muted: "#8d97ad",
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
    components,
    directives,
    theme: {
      themes: {
        light: lightTheme,
        dark: darkTheme,
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
