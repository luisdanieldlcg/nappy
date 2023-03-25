<template>
  <v-img
    v-bind="$attrs"
    color="background"
    class="align-end"
    :lazy-src="header.coverImage"
    :src="header.coverImage"
    cover
  >
    <template #error>
      <v-card
        :color="header.color"
        width="100%"
        elevation="0"
        :border="true"
        height="160"
        style="top: -32px; left: -32px; border-radius: 0 !important"
      />
    </template>
    <v-card
      v-if="!header.coverImage"
      :color="header.color"
      width="100%"
      elevation="0"
      :border="true"
      height="160"
      style="top: 30px; left: -32px; border-radius: 0 !important"
    />
    <template #placeholder>
      <div class="d-flex align-center justify-center fill-height">
        <v-progress-circular
          color="grey-lighten-4"
          indeterminate
        ></v-progress-circular>
      </div>
    </template>
  </v-img>
</template>

<script setup lang="ts">
type CardHeader = {
  coverImage: string;
  color: string;
};
defineProps<{
  header: CardHeader;
}>();
</script>
