<template>
  <div>
    <v-divider thickness="4" color="black"></v-divider>
    <v-list-item :title="title" :subtitle="optionalLabel">
      <template #prepend>
        <v-btn
          :icon="data.icon"
          elevation="0"
          color="background"
          class="mr-4"
        />
      </template>
    </v-list-item>
    <v-divider thickness="4" color="black"></v-divider>
    <TextField
      v-model="title"
      variant="underlined"
      label="Username / URL"
      @input="onTitleChange"
    />
    <TextField
      v-model="optionalLabel"
      variant="underlined"
      label="Label (optional)"
      @input="onOptionalLabelChange"
    />
    <p class="font-italic">Here are some suggestions for your label:</p>
    <v-row class="mt-1">
      <v-col v-for="suggestion in suggestions" cols="3">
        <v-btn
          class="elevation-0 text-capitalize"
          variant="outlined"
          rounded
          @click="setSuggestion(suggestion)"
        >
          {{ suggestion }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-btn class="elevation-0 mr-3" density="comfortable" @click="onCancel"
          >Cancel</v-btn
        >
        <v-btn
          class="bg-black elevation-0"
          density="comfortable"
          @click="onSave"
          >Save</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { LinkType } from "~~/api/dtos/card.dto";

export interface LinkData {
  label: string;
  icon: string;
  type: LinkType;
}
const emit = defineEmits(["exit"]);
const props = defineProps<{
  data: LinkData;
}>();
const editor = useCardEditorStore();
const title = ref("");
const optionalLabel = ref("");
const suggestions = ["Work", "Personal"];

// Reference to the link that is currently being edited
const linkReference = computed(() => {
  return editor.card.links[editor.card.links.length - 1];
});

const onOptionalLabelChange = (value: string) => {
  linkReference.value.subtitle = optionalLabel.value;
};

const onTitleChange = (value: string) => {
  linkReference.value.title = title.value;
};

const setSuggestion = (suggestion: string) => {
  optionalLabel.value = suggestion;
  linkReference.value.subtitle = suggestion;
};

const onSave = () => {
  emit("exit");
};

const onCancel = () => {
  editor.card.links.pop();
  emit("exit");
};
onMounted(() => {
  editor.card.links.push({
    title: "",
    subtitle: "",
    type: props.data.type,
  });
});
</script>

<style scoped></style>
