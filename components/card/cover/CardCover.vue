<template>
  <v-card
    :class="classes"
    :width="containerSize.width"
    :min-height="containerSize.height"
    :max-height="isMini ? containerSize.height : 'auto'"
  >
    <slot name="header" />
    <CardCoverBackground
      v-if="!$slots['header']"
      :image="card.coverImage"
      :fallback-color="card.color"
      :height="coverHeight"
    />
    <slot name="avatar" />
    <CardCoverAvatar
      v-if="!$slots['avatar']"
      :image="card.avatarImage"
      :size="avatarSize"
    />
    <CardCoverContent
      :card="card"
      :small="isMini"
      :can-drag="canDrag"
      @link-click="(link, index) => $emit('link-click', link, index)"
    />
    <slot name="actions" />
  </v-card>
</template>

<script setup lang="ts">
import { LinkDTO } from "~~/api/dtos/card.dto";
defineEmits<{
  (event: "link-click", item: LinkDTO, index: number): void;
}>();
type Mode = "mini" | "normal" | "extended";

export type CardPreview = {
  color: string;
  firstName: string;
  lastName: string;
  coverImage: string;
  avatarImage: string;
  label: string;
  jobTitle: string;
  company: string;
  links: LinkDTO[];
  useNativeIcons: boolean;
};
const props = defineProps<{
  card: CardPreview;
  canDrag: boolean;
  mode: Mode;
}>();

const isMini = computed(() => props.mode === "mini");

const determineWidth = (): number => {
  switch (props.mode) {
    case "mini":
      return 240;
    case "normal":
      return 320;
    case "extended":
      return 380;
  }
};
const containerSize = computed(() => {
  return {
    width: determineWidth(),
    height: isMini.value ? 280 : 40,
  };
});
const coverHeight = computed(() => {
  switch (props.mode) {
    case "mini":
      return 120;
    case "normal":
      return 160;
    case "extended":
      return 220;
  }
});

const avatarSize = computed(() => (isMini.value ? 85 : 110));

const classes = computed(() => {
  return {
    "card-shadow-light": isMini.value,
    shadow: !isMini.value,
    "pb-4": true,
  };
});
</script>

<style scoped>
.shadow {
  overflow-x: hidden;
  box-shadow: 0 5px 15px 0 rgba(49, 49, 93, 0.13),
    0 15px 35px 0 rgba(49, 49, 93, 0.1);
}
</style>
