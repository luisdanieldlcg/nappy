<template>
  <div class="text-center">
    <v-card
      class="container-hover"
      color="#f9fafb"
      :elevation="0"
      :width="width"
      :height="100"
      :style="style"
      :border="true"
    >
      <v-container class="pa-6 text-grey-subtitle font-weight-medium">
        <v-icon icon="mdi-plus" size="small" />
        <h5 class="font-weight-medium">{{ title }}</h5>
      </v-container>
    </v-card>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  rounded: {
    type: Boolean,
    required: false,
    default: false,
  },
});
const width = computed(() => {
  return props.rounded ? 105 : 160;
});
const style = computed(() => {
  return {
    "border-radius": props.rounded ? "50% !important" : "0",
  };
});
</script>

<style lang="scss">
.container-hover {
  cursor: pointer;
  &:hover {
    background-color: #fdfdfd;
  }
}
</style>
