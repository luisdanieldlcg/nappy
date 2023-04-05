<template>
  <v-tooltip text="Save changes" location="bottom">
    <template #activator="{ props }">
      <v-avatar
        @click="$emit('done')"
        style="cursor: pointer"
        v-bind="props"
        class="ml-2"
        icon="mdi-check"
        color="transparent"
        size="36"
      />
    </template>
  </v-tooltip>
</template>

<script setup lang="ts">
defineEmits(["done"]);
</script>
