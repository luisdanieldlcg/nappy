<template>
  <v-row style="overflow: auto; overflow-y: hidden" no-gutters>
    <v-col cols="5">
      <v-sheet
        color="background"
        height="100vh"
        class="d-flex justify-center align-center"
      >
        <CardPreviewToggle />
      </v-sheet>
    </v-col>
    <v-col cols="7">
      <v-sheet color="white" height="100vh">
        <v-form
          v-model="isFormValid"
          ref="form"
          validate-on="input"
          autocomplete="off"
          @submit.prevent
        >
          <component
            :is="dialog"
            :is-editing="onboarding.linkModalRequest.isEditing"
            v-model="onboarding.linkModalRequest.show"
          />
          <v-snackbar v-model="snackbar" color="black" class="elevation-0">
            <p>
              {{ onboarding.errorMessage }}
            </p>
            <template v-slot:actions>
              <v-btn variant="text" @click="snackbar = false" icon>
                <Icon name="mdi-close" />
              </v-btn>
            </template>
          </v-snackbar>
          <Stepper
            :steps="steps"
            v-model="onboarding.step"
            :continue="Boolean(isFormValid)"
          >
            <template #controls="{ nextStep, prevStep }">
              <v-btn
                class="elevation-0"
                color="black"
                location="center"
                width="54%"
                @click="onNext(nextStep)"
                type="submit"
                :loading="onboarding.loading"
              >
                Continue
              </v-btn>
            </template>
          </Stepper>
        </v-form>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
export type FieldType = CardLink | "name" | "job" | "company";

import { CardLink } from "~/api/dtos/card.dto";
const form = ref<HTMLFormElement | null>(null);
const snackbar = ref(false);
const isFormValid = ref(false);
const onboarding = useOnboardingStore();
const personalDetails = ["name", "job", "company"];

const dialog = computed(() => {
  if (personalDetails.includes(onboarding.linkModalRequest.field)) {
    return resolveComponent("PersonalDetailsDialog");
  }
  return resolveComponent("LinksDialog");
});

const onNext = async (nextCallback: () => void) => {
  if (isFormValid.value) {
    // only process form if it's valid
    const proceed = await onboarding.processForm();
    if (!proceed) {
      snackbar.value = true;
      return;
    }
    // reset snackbar in case it was shown before
    snackbar.value = false;
    nextCallback();
  }
};
const steps = [
  {
    id: 0,
    title: "Create an account",
    component: resolveComponent("CreateAccount"),
  },
  {
    id: 1,
    title: "Customize your card",
    component: resolveComponent("CustomizeCard"),
  },
  {
    id: 2,
    title: "Get started",
    component: resolveComponent("GetStarted"),
  },
];
</script>

<style scoped lang="scss">
// Refer to https://github.com/bahadirsofuoglu/form-wizard-vue3/issues/22
::v-deep(.form-wizard-vue) {
  .fw-step-active {
    background: black !important;
    color: rgb(255, 255, 255) !important;
  }
  .fw-step-checked {
    border: 1px solid black !important;
  }
}
</style>
