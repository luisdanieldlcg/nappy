<template>
  <div class="text-center" v-bind="$attrs">
    <v-hover v-slot="{ isHovering, props }">
      <v-card
        v-bind="props"
        class="container-hover"
        color="background"
        :elevation="0"
        :width="size.width"
        :height="size.height"
        :style="style"
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
              <Icon name="mdi-pencil" size="16" />
            </v-btn>
            <v-btn
              variant="outlined"
              color="white"
              size="32"
              icon
              @click="removeImageHandler"
            >
              <Icon name="mdi-trash-can-outline" size="16" />
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
const emit = defineEmits(["pickImage", "removeImage"]);
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

const size = computed(() => {
  return {
    width: props.rounded ? 120 : 160,
    height: props.rounded ? 120 : 105,
  };
});
const style = computed(() => {
  return {
    "border-radius": props.rounded ? "50% !important" : "0",
    top: props.rounded ? "-5px" : "0",
  };
});
const cardEditor = useCardEditorStore();
const imageRequestHandler = () => {
  if (!props.image) {
    cardEditor.imageDropDialog = true;
  }
};

const removeImageHandler = () => {
  emit("removeImage");
};
const editImageHandler = () => {
  if (props.image) {
    useImageEditor().onOpen(props.image);
  }
};
</script>

<style lang="scss">
.container-hover {
  cursor: pointer;
  border: 1px solid #eff1f4;
  &:hover {
    background-color: #fdfdfd;
  }
}
</style>
