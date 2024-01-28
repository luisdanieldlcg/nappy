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
    <TextField v-else v-model="titleModel" type="not-empty" label="Title" />
    <TextField
      label="Label"
      hint="This is optional, but it helps you remember what this link is for."
      v-model="link.subtitle"
    />
  </FormDialog>
</template>

<script setup lang="ts">
import { CardLink, mobileLinks } from "~/api/dtos/card.dto";

const props = defineProps({
  isEditing: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const onboarding = useOnboardingStore();
const title = computed(() => {
  return "Add your " + onboarding.linkModalRequest.field;
});

const isMobile = computed(() => {
  return mobileLinks.includes(onboarding.linkModalRequest.field);
});
const link = computed({
  get() {
    // Use onboarding link req index to get the selected field
    return props.isEditing
      ? onboarding.card.links[onboarding.linkModalRequest.index]
      : onboarding.card.links[onboarding.card.links.length - 1] ?? {
          id: "",
          title: "",
          subtitle: "",
          type: onboarding.linkModalRequest.field as CardLink,
        };
  },
  set(value) {
    onboarding.card.links[onboarding.card.links.length - 1] = value;
  },
});
const titleModel = computed({
  get() {
    return link.value.title;
  },
  set(val: string) {
    link.value.title = val;
  },
});
const onVisibilityChanged = (visible: boolean) => {
  if (visible) createLink();
};
onMounted(() => {
  createLink();
});

const createLink = () => {
  if (props.isEditing) return;
  onboarding.card.links.push({
    id: "",
    title: "",
    subtitle: "",
    type: onboarding.linkModalRequest.field as CardLink,
  });
};

const onCancel = () => {
  if (props.isEditing) return;
  onboarding.card.links.pop();
};
</script>
