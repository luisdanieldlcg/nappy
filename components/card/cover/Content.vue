<template>
  <v-card-text class="pl-4 pt-3 pb-0">
    <div class="text-grey-subtitle text-center mb-0 p">
      <div :class="labelMargin">
        <v-chip :size="labelSize"> {{ card.label }} </v-chip>
      </div>
      <h3 v-if="small" class="mt-2 text-no-wrap">
        {{ fullName }}
      </h3>
      <h1 class="mt-2 text-no-wrap" v-else>
        {{ fullName }}
      </h1>
      <p v-if="card.jobTitle" class="text-h6 mt-2">{{ card.jobTitle }}</p>
      <p v-if="card.company" class="text-h6">{{ card.company }}</p>
    </div>
  </v-card-text>
</template>

<script setup lang="ts">
import { ICardDTO } from "~~/api/dtos/card.dto";

const props = defineProps({
  card: {
    type: Object as PropType<Partial<ICardDTO>>,
    required: true,
  },
  small: {
    type: Boolean,
    default: false,
  },
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

