<template>
  <v-tooltip text="Save changes" location="bottom">
    <template #activator="{ props }">
      <v-avatar
        @click="$emit('done')"
        style="cursor: pointer"
        v-bind="props"
        class="mt-1"
      >
        <Icon name="charm:circle-tick" size="28" color="black" />
      </v-avatar>
    </template>
  </v-tooltip>
</template>

<script setup lang="ts">
defineEmits(["done"]);
</script>
