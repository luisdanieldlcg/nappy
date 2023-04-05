<template>
  <div>
    <v-card
      v-if="outline"
      :color="color"
      class="d-flex justify-center align-center color-wrapper"
      variant="outlined"
      elevation="0"
    >
      <div
        :class="{
          'multi-color': multiColor,
          color: true,
        }"
      ></div>
    </v-card>
    <v-card
      v-else
      elevation="0"
      v-bind="$attrs"
      :class="{
        'multi-color': multiColor,
        color: true,
      }"
    >
    </v-card>
  </div>
</template>

<script setup lang="ts">
defineProps({
  multiColor: {
    type: Boolean,
    required: false,
    default: false,
  },
  color: {
    type: String,
    required: false,
  },
  outline: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<style scoped>
.multi-color {
  background-image: conic-gradient(
    #b71c1c 0%,
    #e53935 10%,
    #ef5350 20%,
    #e65100 30%,
    #ff8f00 40%,
    #ffb300 50%,
    #0d47a1 60%,
    #1976d2 70%,
    #42a5f5 80%,
    #1b5e20 90%,
    #388e3c 100%
  );
}
.color {
  width: 24px;
  height: 24px;
  border-radius: 4px !important;
  background-color: v-bind(color);
}

.color-wrapper {
  border-radius: 6px !important;
  border: 2px solid;
  margin-top: 26px !important;
  margin-left: 28px !important;
  width: 34px;
  height: 34px;
}
</style>
