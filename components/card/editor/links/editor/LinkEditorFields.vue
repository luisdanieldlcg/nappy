<template>
  <div>
    <PhoneNumberTextField
      v-if="canHandlePhone"
      v-model="editor.linkPreview.title"
      show-code-on-list
    />
    <TextField
      v-else
      density="compact"
      variant="underlined"
      label="Title"
      v-model="editor.linkPreview.title"
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
    </TextField>
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
import { CardLink } from "~~/api/dtos/card.dto";
const editor = useLinkEditorStore();
const { linkPreview } = storeToRefs(editor);
const canHandlePhone = computed(
  () =>
    editor.linkPreview.type === "phone" ||
    editor.linkPreview.type === "whatsapp"
);
// This array contains the links that do not handle an URL
const noURL: CardLink[] = ["phone", "email", "whatsapp"];
const canHandleURL = computed(() => {
  return !noURL.includes(editor.linkPreview.type);
});
</script>
