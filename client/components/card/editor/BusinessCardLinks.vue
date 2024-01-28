<template>
  <p
    style="font-size: 13px; font-weight: bold"
    class="ma-2"
    :class="{
      'text-center': centerTitle,
    }"
  >
    Social Links
  </p>
  <v-row justify="center">
    <v-col v-for="entry in communicationLinks" cols="2" class="mt-5">
      <CardLinkButton
        :label="entry"
        :icon="httpLinks[entry].nativeIcon"
        @click="$emit('field-click', entry)"
      />
    </v-col>
  </v-row>
  <p
    style="font-size: 13px; font-weight: bold"
    :class="{
      'text-center': centerTitle,
    }"
    class="ma-2"
  >
    Communication Links
  </p>
  <v-row justify="center">
    <v-col v-for="entry in socialLinks" cols="2" class="mt-5">
      <CardLinkButton
        :label="entry"
        :icon="httpLinks[entry].nativeIcon"
        @click="$emit('field-click', entry)"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import {
  CardLink,
  communicationLinks,
  socialLinks,
} from "~~/api/dtos/card.dto";
defineProps({
  centerTitle: {
    type: Boolean,
    default: false,
  },
});
defineEmits<{
  (e: "field-click", field: CardLink): void;
}>();
</script>
