<template>
  <v-row justify="center" no-gutters class="mt-6">
    <v-col :cols="isBelowLg ? 7 : 5">
      <slot name="left"></slot>
    </v-col>
    <v-divider
      :thickness="1"
      :vertical="!isBelowLg"
      class="mr-12 mb-7"
    ></v-divider>
    <v-col :cols="isBelowLg ? 9 : 6">
      <slot name="right"></slot>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify/lib/framework.mjs";

const { width } = useDisplay();
const isBelowLg = computed(() => width.value < 1340);
</script>
