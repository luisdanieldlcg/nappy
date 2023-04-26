<template>
  <div>
    <div v-if="canHandlePhone" class="mt-4">
      <MazPhoneNumberInput
        v-model="editor.linkPreview.title"
        show-code-on-list
        color="black"
        @update="onPhoneNumberUpdate"
        :success="phoneNumberResult?.isValid"
      />
    </div>
    <v-text-field
      v-else
      density="compact"
      variant="underlined"
      label="Title"
      v-model="linkPreview.title"
    >
      <template #details v-if="canHandleURL">
        <Icon name="ph:link-simple-bold" size="15" class="mr-2" />
        <nuxt-link
          :to="httpLinks[linkPreview.type].url + linkPreview.title"
          target="_blank"
          class="font-italic text-grey-darken-3"
        >
          {{ httpLinks[linkPreview.type].url + linkPreview.title }}
        </nuxt-link>
      </template>
    </v-text-field>

    <TextField
      density="compact"
      v-model="editor.linkPreview.subtitle"
      variant="underlined"
      label="Label"
      hint="This is optional, but it helps you remember what this link is for."
    >
    </TextField>
  </div>
</template>

<script setup lang="ts">
import { Result } from "maz-ui/components/MazPhoneNumberInput";

import { linksNoURL, mobileLinks } from "~~/api/dtos/card.dto";
const editor = useLinkEditorStore();
const { linkPreview } = storeToRefs(editor);

const canHandlePhone = computed(() =>
  mobileLinks.includes(editor.linkPreview.type)
);
const phoneNumberResult = ref<Result>();

const onPhoneNumberUpdate = (event: any) => {
  phoneNumberResult.value = event;
  editor.isValidLink = event.isValid;
};

const canHandleURL = computed(() => {
  return !linksNoURL.includes(editor.linkPreview.type);
});
</script>
