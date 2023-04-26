<template>
  <FormDialog
    persistent
    :model-value="false"
    :title="title"
    @visibility-update="onVisibilityChanged"
    @cancel="onCancel"
  >
    <template v-if="isNameField">
      <TextField
        label="First name"
        type="not-empty"
        v-model="onboarding.card.firstName"
      />
      <TextField
        label="Last name"
        type="not-empty"
        v-model="onboarding.card.lastName"
      />
    </template>
    <template v-if="isJobField">
      <TextField
        label="Job"
        type="not-empty"
        v-model="onboarding.card.jobTitle"
      />
    </template>
    <template v-if="isCompanyField">
      <TextField
        label="Company"
        type="not-empty"
        v-model="onboarding.card.company"
      />
    </template>
  </FormDialog>
</template>

<script setup lang="ts">
const onboarding = useOnboardingStore();
const title = computed(() => "Enter your " + onboarding.selectedCardField);
const isNameField = computed(() => onboarding.selectedCardField === "name");
const isJobField = computed(() => onboarding.selectedCardField === "job");
const isCompanyField = computed(() => {
  return onboarding.selectedCardField === "company";
});
const onVisibilityChanged = (visible: boolean) => {
  if (visible) {
    Object.assign(
      onboarding.cardBeforeEdit,
      JSON.parse(JSON.stringify(onboarding.card))
    );
  }
};
const onCancel = () => {
  Object.assign(onboarding.card, onboarding.cardBeforeEdit);
};
</script>
