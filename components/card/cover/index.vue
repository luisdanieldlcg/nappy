<template>
  <v-card
    :class="classes"
    :width="containerSize.width"
    :height="containerSize.height"
  >
    <slot name="header" />
    <CardCoverBackground
      v-if="!$slots['header']"
      :image="card.coverImage"
      :fallback-color="card.color"
      :height="coverHeight"
    />
    <CardCoverAvatar :image="card.avatarImage" :size="avatarSize">
      <slot name="avatar" v-if="$slots['avatar']" />
    </CardCoverAvatar>
    <CardCoverContent :card="card" :small="mini" />
    <slot name="actions" />
  </v-card>
</template>

<script setup lang="ts">
import { ICardDTO } from "~~/api/dtos/card.dto";

const props = defineProps({
  card: {
    type: Object as PropType<Partial<ICardDTO>>,
    required: true,
  },
  lightShadow: {
    type: Boolean,
    default: false,
  },
  mini: {
    type: Boolean,
    default: false,
  },
});
console.log(props.card.avatarImage);
const containerSize = computed(() => {
  return {
    width: props.mini ? 240 : 300,
    height: props.mini ? 280 : 400,
  };
});

const coverHeight = computed(() => (props.mini ? 120 : 160));

const avatarSize = computed(() => (props.mini ? 85 : 110));

const classes = computed(() => {
  return {
    "card-shadow-light": props.lightShadow,
    shadow: !props.lightShadow,
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
