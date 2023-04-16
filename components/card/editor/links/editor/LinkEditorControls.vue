<template>
  <v-row class="mt-3 mb-3">
    <v-col cols="6">
      <v-btn
        class="elevation-0 mr-3 text-capitalize"
        variant="outlined"
        @click="onCancel"
        >Cancel</v-btn
      >
      <v-btn class="bg-black elevation-0 text-capitalize" type="submit">
        Save</v-btn
      >
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
const editor = useLinkEditorStore();
const onCancel = () => {
  editor.cancel();
};
</script>
