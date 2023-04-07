<template>
  <v-list-item :key="title">
    <template #title>
      <v-list-item-title
        style="font-size: 14px"
        v-text="title"
        class="text-capitalize"
      />
    </template>
    <template #subtitle>
      <v-list-item-subtitle
        style="font-size: 13px"
        v-text="subtitle"
        class="text-capitalize"
      />
    </template>

    <template #prepend>
      <v-avatar :color="useNativeIcons ? undefined : color">
        <Icon
          :class="additionalMargin"
          :size="iconSize.toString()"
          :color="iconColor"
          :name="
            useNativeIcons ? nativeLinksIconMap[link] : customLinksIconMap[link]
          "
        />
      </v-avatar>
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
import { CardLink } from "~~/api/dtos/card.dto";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  link: {
    type: String as PropType<CardLink>,
    required: true,
  },
  useNativeIcons: {
    type: Boolean,
    required: true,
  },
});
const iconSize = computed(() => {
  return props.useNativeIcons ? 30 : 24;
});
const additionalMargin = computed(() => {
  return {
    "mb-1": props.useNativeIcons,
  };
});
const iconColor = computed(() => {
  // I need to check if the card color is darker or lighter than a certain
  // threshold, and then return a black or white to make a contrast with the
  // background color.

  // get rgb from hex
  const rgb = parseInt(props.color.replace("#", ""), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  // calculate luminance
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luma > 128 ? "black" : "white";
});
</script>

<style scoped></style>
