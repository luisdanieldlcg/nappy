<template>
  <v-form ref="form" @submit.prevent="editor.save(form)">
    <v-divider thickness="4" color="black"></v-divider>
    <LinkItem :link="linkPreview" color="black" :use-native-icons="true" />
    <v-divider thickness="4" color="black"></v-divider>
    <LinkEditorFields />
    <LinkLabelSuggestions />
    <LinkEditorControls />
  </v-form>
</template>

<script setup lang="ts">
const form = ref<HTMLFormElement | null>(null);
const editor = useLinkEditorStore();
const { linkPreview } = storeToRefs(editor);
</script>
