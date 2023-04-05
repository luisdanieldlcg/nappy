<template>
  <v-card-text class="pl-4 pt-3 pb-0 text-center">
    <div class="text-grey-subtitle text-center mb-0 p">
      <div :class="labelMargin">
        <v-chip :size="labelSize"> {{ card.label }} </v-chip>
      </div>
      <h3 v-if="small" :class="classes">
        {{ fullName }}
      </h3>
      <h1 :class="classes" v-else style="line-height: 32px">
        {{ fullName }}
      </h1>
      <p v-if="card.jobTitle" class="text-h6 mt-2">{{ card.jobTitle }}</p>
      <p v-if="card.company" class="text-h6">{{ card.company }}</p>
    </div>
  </v-card-text>
  <v-list v-if="!small" nav class="pa-4 ml-2">
    <v-list-item
      v-for="link in card.links"
      :title="link.title"
      :subtitle="link.subtitle"
      :key="link.title"
    >
      <template #prepend>
        <v-avatar :color="card.color">
          <v-icon
            :icon="`mdi-${link.type.toLowerCase()}`"
            :color="iconColor"
            class="text-invert"
          />
        </v-avatar>
      </template>
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
import { Card } from "~~/stores/card-editor.store";

const props = defineProps<{
  card: Partial<Card>;
  small: boolean;
}>();

// }>({
//   card: {
//     type: Object as PropType<Partial<ICardDTO>>,
//     required: true,
//   },
//   small: {
//     type: Boolean,
//     default: false,
//   },
// });
const iconColor = computed(() => {
  // I need to check if the card color is darker or lighter than a certain
  // threshold, and then return a black or white to make a contrast with the
  // background color.
  const color = props.card.color;
  if (!color) return;
  // get rgb from hex
  const rgb = parseInt(color.replace("#", ""), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  // calculate luminance
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luma > 128 ? "black" : "white";
});
const classes = computed(() => {
  return {
    "text-truncate": props.small,
    "mt-2": true,
  };
});
const fullName = computed(() => {
  return props.card.firstName + " " + props.card.lastName;
});

const labelMargin = computed(() => {
  return props.small ? "mt-11" : "mt-14";
});
const labelSize = computed(() => {
  return props.small ? "small" : "default";
});
</script>
