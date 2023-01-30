<template>
  <v-switch
    v-model="dark"
    @click="onToggle"
    inset
    :ripple="false"
    false-icon="mdi-white-balance-sunny"
    true-icon="mdi-weather-night"
  >
  </v-switch>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify/lib/framework.mjs";

const themeController = useTheme();
// const togglerIconColor = computed(() => {
//   return "white";
// });
const dark = ref(false);
const onToggle = (dark: unknown) => {
  themeController.global.name.value =
    themeController.global.name.value === "dark" ? "light" : "dark";
};
</script>

<style scoped></style>

<style>
/* // $color: v-bind(togglerIconColor);
$color: "white"; */
.mdi-white-balance-sunny {
  color: white;
}
</style>
