<template>
  <p class="font-italic mt-4">Here are some suggestions for your label:</p>
  <div style="max-width: 400px">
    <v-row class="mt-1">
      <v-col
        v-for="suggestion in suggestions[editor.linkPreview.type]"
        cols="4"
      >
        <v-btn
          max-width="130"
          min-width="100"
          class="elevation-0 text-capitalize"
          variant="outlined"
          rounded
          @click="setSuggestion(suggestion)"
        >
          <p>{{ suggestion }}</p>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
const editor = useLinkEditorStore();
const setSuggestion = (suggestion: string) => {
  editor.linkPreview.subtitle = suggestion;
};
// Suggestions for the optional label
const suggestions: { [key: string]: string[] } = {
  instagram: ["Personal", "Business", "Entertainment", "News"],
  twitter: ["Politics", "Sports", "Business", "Personal"],
  tiktok: ["Dance", "Comedy", "Education", "Entertainment"],
  linkedin: ["Professional", "Networking", "Recruiter"],
  facebook: ["Personal", "Family", "Friends", "Business"],
  email: ["Personal", "Work", "Business", "Newsletter"],
  phone: ["Personal", "Work", "Business", "Emergency"],
  whatsapp: ["Personal", "Work", "Group Chat", "Urgent"],
  discord: ["Community", "Gaming", "Study Group", "Friends"],
  telegram: ["Personal", "Work", "Group Chat", "Business"],
};
</script>
