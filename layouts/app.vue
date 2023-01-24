<template>
  <div>
    <v-navigation-drawer class="rounded" style="border: none">
      <v-list-item>
        <v-list-item-title
          class="text-center"
          style="font-size: 24px; padding: 20px"
        >
          Nap<span class="text-grey">py</span>
        </v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <div class="spacer">
        <v-container>
          <v-row>
            <v-col>
              <v-list :items="items" color="primary" />
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-navigation-drawer>
    <v-app-bar flat color="background">
      <v-app-bar-title> Dashboard </v-app-bar-title>

      <v-switch
        v-model="dark"
        @click="onToggle"
        inset
        :ripple="false"
        false-icon="mdi-white-balance-sunny"
        true-icon="mdi-weather-night"
        label="Theme switcher"
      >
      </v-switch>
      <v-list>
        <v-list-item
          prepend-avatar="https://cdn.vuetifyjs.com/images/john.png"
          title="Luis de la Cruz"
          subtitle="danikingrd@gmail.com"
        >
        </v-list-item>
      </v-list>
    </v-app-bar>
    <v-main>
      <v-container class="my-8 mx-10" fluid>
        <slot></slot>
      </v-container>
    </v-main>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify/lib/framework.mjs";
const themeController = useTheme();
const togglerIconColor = computed(() => {
  return "white";
});
const dark = ref(false);
const onToggle = (dark: unknown) => {
  themeController.global.name.value =
    themeController.global.name.value === "dark" ? "light" : "dark";
};

const items = [
  {
    title: "Overview",
    props: {
      prependIcon: "mdi-view-dashboard-outline",
      to: "/app/overview",
    },
  },
  {
    title: "Cards",
    props: {
      prependIcon: "mdi-card-account-details",
      to: "/app/cards",
    },
  },
  {
    title: "Contacts",
    props: {
      prependIcon: "mdi-account-box",
      to: "/app/contacts",
    },
  },
];
</script>

<style lang="scss">
$color: v-bind(togglerIconColor);
.mdi-white-balance-sunny {
  color: $color;
}
</style>
