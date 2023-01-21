<template>
  <div>
    <v-card class="text-center my-6 insight-card">
      <v-card-text>
        <v-btn
          :class="`text-card-${props.theme}-icon mb-6`"
          :color="`card-${props.theme}-icon-bg`"
          :icon="icon"
          size="64"
          :ripple="false"
          elevation="0"
        ></v-btn>
        <p :class="`text-h3 font-weight-bold text-card-${props.theme}-accent`">
          {{ quantity }}
        </p>
        <p class="text-h6 font-weight-bold">{{ title }}</p>
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  title: String,
  quantity: {
    type: Number,
    default: 0,
  },
  icon: {
    type: String,
  },
  theme: {
    type: String,
    default: "aqua",
  },
});
console.log(`text-card-${props.theme}-icon`);
</script>

<style scoped></style>
