<template>
  <div class="text-center">
    <v-card class="container-hover" :elevation="0" :min-width="240" :border="true">
      <v-container class="pa-6 text-grey-subtitle font-weight-medium">
        <v-icon icon="mdi-plus"></v-icon>
        <p>{{ title }}</p>
      </v-container>
    </v-card>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.container-hover {
  cursor: pointer;
  background-color: #f6f8fc;
  &:hover {
    background-color: #fdfdfd;
  }
}
</style>
