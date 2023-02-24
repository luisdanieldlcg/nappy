<template>
  <div class="text-center mt-6">
    <v-card class="card-shadow-light container-hover" :elevation="0">
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
