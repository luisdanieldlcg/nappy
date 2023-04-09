<template>
  <v-list-item :key="link.title">
    <template #title>
      <v-list-item-title
        style="font-size: 14px"
        v-text="link.title"
        class="text-capitalize"
      />
    </template>
    <template #subtitle>
      <v-list-item-subtitle
        style="font-size: 13px"
        v-text="link.subtitle"
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
            useNativeIcons
              ? nativeLinksIconMap[link.type]
              : customLinksIconMap[link.type]
          "
        />
      </v-avatar>
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
import { LinkDTO } from '~~/api/dtos/card.dto';


const props = defineProps<{
  link: LinkDTO;
  color: string;
  useNativeIcons: boolean;
}>();

const iconSize = computed(() => {
  return props.useNativeIcons ? 30 : 24;
});
const additionalMargin = computed(() => {
  return {
    "mb-1": props.useNativeIcons,
  };
});
const iconColor = computed(() => {
  // We need to check if the card color is darker or lighter than a certain
  // threshold, and then return a black or white to make a contrast with the
  // background color.

  // parse RGB from HEX
  const rgb = parseInt(props.color.replace("#", ""), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  // calculate luminance srgb
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luma > 128 ? "black" : "white";
});
</script>
