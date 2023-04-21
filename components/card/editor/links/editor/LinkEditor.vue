<template>
  <v-form ref="form" @submit.prevent="save">
    <v-divider thickness="4" color="black"></v-divider>
    <LinkItem :link="linkPreview" color="black" :use-native-icons="true" />
    <v-divider thickness="4" color="black"></v-divider>
    <LinkEditorFields />
    <LinkLabelSuggestions />
    <LinkEditorControls />
  </v-form>
</template>

<script setup lang="ts">
const editor = useLinkEditorStore();
const { linkPreview } = storeToRefs(editor);
const form = ref<HTMLFormElement | null>(null);

const save = async () => {
  if (!form || !form.value) {
    return;
  }
  const { valid } = await form.value.validate();
  // Return if this is not a valid form
  if (!valid || !editor.isValidLink) {
    return;
  }
  editor.saveInternal();
  editor.editing = false;
};
</script>
