<template>
  <FormDialog
    persistent
    :no-validate="isMobile"
    :model-value="false"
    :title="title"
    @visibility-update="onVisibilityChanged"
    @cancel="onCancel"
  >
    <template v-if="isMobile">
      <MazPhoneNumberInput
        v-model="link.title"
        show-code-on-list
        color="black"
      />
    </template>
    <TextField v-else v-model="link.title" type="not-empty" label="Title" />
    <TextField
      label="Label"
      hint="This is optional, but it helps you remember what this link is for."
      v-model="link.subtitle"
    />
  </FormDialog>
</template>

<script setup lang="ts">
import { CardLink, mobileLinks } from "~/api/dtos/card.dto";

const onboarding = useOnboardingStore();
const title = computed(() => {
  return "Add your " + onboarding.selectedCardField;
});
const isMobile = computed(() => {
  return mobileLinks.includes(onboarding.selectedCardField);
});
const link = computed({
  get() {
    return (
      onboarding.card.links[onboarding.card.links.length - 1] ?? {
        id: "",
        title: "",
        subtitle: "",
        type: onboarding.selectedCardField as CardLink,
      }
    );
  },
  set(value) {
    onboarding.card.links[onboarding.card.links.length - 1] = value;
  },
});
const onVisibilityChanged = (visible: boolean) => {
  if (visible) {
    onboarding.card.links.push({
      id: "",
      title: "",
      subtitle: "",
      type: onboarding.selectedCardField as CardLink,
    });
  }
};
onMounted(() => {
  onboarding.card.links.push({
    id: "",
    title: "",
    subtitle: "",
    type: onboarding.selectedCardField as CardLink,
  });
});
const onCancel = () => {
  onboarding.card.links.pop();
};
</script>
