<template>
  <v-avatar
    color="grey-lighten-2"
    size="32"
    class="ml-4 hover-effect"
    @click="navigateToCreateCard"
  >
    <v-icon icon="mdi-plus" size="16" />
  </v-avatar>
</template>

<script setup lang="ts">
function navigateToCreateCard() {
  navigateTo("/app/cards/create");
}
</script>

<style scoped lang="scss">
.hover-effect {
  transition: 0.15s ease-in;
  &:hover {
    transform: translateY(-4px);
    cursor: pointer;
  }
}
</style>
