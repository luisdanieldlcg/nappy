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
      <template v-if="!small">
        <p v-if="card.jobTitle" class="text-h6 mt-2">{{ card.jobTitle }}</p>
        <p v-if="card.company" class="text-h6">{{ card.company }}</p>
      </template>
    </div>
  </v-card-text>
  <template v-if="!small">
    <div class="mt-2">
      <ReorderableLinks
        v-if="!small"
        :card="card"
        :can-drag="canDrag"
        @click="(link, index) => $emit('link-click', link, index)"
      />
    </div>
  </template>
</template>

<script setup lang="ts">
import { LinkDTO } from "~/api/dtos/card.dto";
import { Card } from "~~/stores/card-editor.store";

const props = defineProps<{
  card: Card;
  small: boolean;
  canDrag: boolean;
}>();

defineEmits<{
  (event: "link-click", item: LinkDTO, index: number): void;
}>();

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
