<template>
  <div class="text-center" v-bind="$attrs">
    <v-hover v-slot="{ isHovering, props }">
      <v-card
        v-bind="props"
        class="container-hover"
        color="#f9fafb"
        :elevation="0"
        :width="width"
        :height="100"
        :style="style"
        :border="true"
        :image="image"
      >
        <v-overlay
          :close-on-content-click="false"
          :model-value="isHovering"
          contained
          class="align-center justify-center"
          v-if="image"
        >
          <v-row justify="center" class="mt-0">
            <v-btn
              class="mr-3"
              variant="outlined"
              color="white"
              size="32"
              icon
              @click="editImageHandler"
            >
              <v-icon size="16" icon="mdi-pencil" color="white" />
            </v-btn>
            <v-btn
              variant="outlined"
              color="white"
              size="32"
              icon
              @click="removeImageHandler"
            >
              <v-icon size="16" icon="mdi-trash-can-outline" color="white" />
            </v-btn>
          </v-row>
          <v-row>
            <h5 class="text-white font-weight-medium mt-3">{{ title }}</h5>
          </v-row>
        </v-overlay>

        <v-container
          v-else
          class="pa-6 text-grey-subtitle font-weight-medium"
          @click="imageRequestHandler"
        >
          <v-icon icon="mdi-plus" size="small" />
          <h5 class="font-weight-medium">{{ title }}</h5>
        </v-container>
      </v-card>
    </v-hover>
  </div>
</template>

<script setup lang="ts">
import { useCardEditorStore } from "~~/stores/card-editor.store";

const emit = defineEmits(["searchImage", "removeImage", "editImage"]);
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  rounded: {
    type: Boolean,
    required: false,
    default: false,
  },
  image: {
    type: String,
    required: false,
  },
});
const width = computed(() => {
  return props.rounded ? 105 : 160;
});
const style = computed(() => {
  return {
    "border-radius": props.rounded ? "50% !important" : "0",
  };
});
const imageRequestHandler = () => {
  if (!props.image) {
    emit("searchImage");
  }
};

const removeImageHandler = () => {
  emit("removeImage");
};
const editImageHandler = () => {
  emit("editImage");
};
</script>

<style lang="scss">
.container-hover {
  cursor: pointer;
  &:hover {
    background-color: #fdfdfd;
  }
}
</style>
