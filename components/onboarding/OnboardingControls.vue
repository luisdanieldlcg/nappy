<template>
  <v-btn class="elevation-0" color="black" block width="100" @click="nextStep">
    <p>Next</p>
  </v-btn>
  <!-- <v-row justify="center">
    <v-col cols="12" sm="7" md="6">
      <v-btn
        class="text-capitalize elevation-0"
        color="black"
        @click="prevStep"
        v-if="modelValue > 0"
        height="40"
      >
        <Icon name="mdi-arrow-left" class="mr-1" size="20" />
        <p>Back</p>
      </v-btn>
      <v-btn
        class="text-capitalize elevation-0 ml-7"
        color="black"
        @click="nextStep"
        width="90%"
        height="40"
        type="submit"
        :loading="onboarding.loading"
      >
        <p>Next</p>
        <Icon name="mdi-arrow-right" class="ml-1" size="20" />
      </v-btn>
    </v-col>
  </v-row> -->
</template>

<script setup lang="ts">
const START_STEP_INDEX = 0;
const END_STEP_INDEX = 2;

const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  valid: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();
const onboarding = useOnboardingStore();
const nextStep = async () => {
  if (outOfBounds(props.modelValue + 1)) {
    return;
  }
  if (!props.valid) {
    return;
  }
  const proceed = await onboarding.processForm();
  if (!proceed) {
    return;
  }
  emit("update:modelValue", props.modelValue + 1);
};

const prevStep = () => {
  if (outOfBounds(props.modelValue - 1)) {
    return;
  }

  emit("update:modelValue", props.modelValue - 1);
};

const outOfBounds = (step: number) => {
  return step < START_STEP_INDEX || step > END_STEP_INDEX;
};
</script>
