<template>
  <div class="d-flex flex-column justify-center align-center">
    <v-avatar color="white" :size="size" style="position: absolute">
      <slot>
        <v-avatar :image="image" :size="innerSize" v-if="image" />
        <v-icon
          icon="mdi-account-circle"
          color="grey"
          :size="innerSize + 20"
          v-else
        />
      </slot>
    </v-avatar>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  size: {
    type: Number,
    default: 90,
  },
  // I need to declare an optional string
  image: {
    type: String,
    default: undefined,
  },
});
const innerSize = computed(() => props.size - 10);
</script>
