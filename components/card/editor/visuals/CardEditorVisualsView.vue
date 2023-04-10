<template>
  <DashNote title="Add your images" icon="ion:md-images" />
  <v-row>
    <v-col
      v-for="slot in imageSlots"
      :cols="slot.flex"
      :class="slot.margin"
      :key="slot.title"
    >
      <CardEditorImageSlot
        :rounded="slot.rounded"
        :image="slot.image"
        :title="slot.title"
        @click="slot.onClick"
        @remove-image="slot.onRemoveImage"
      />
    </v-col>
  </v-row>
  <DashNote
    title="Pick your favorite theme"
    icon="mingcute:color-picker-fill"
  />
  <CardEditorColorPicker />
  <v-switch
    class="ml-5 d-inline-block"
    color="black"
    v-model="editorStore.card.useNativeIcons"
  >
    <template #label>
      <p style="font-size: 15px" class="mr-2">Use native link icons</p>
      <v-tooltip
      location="bottom"
        text="Enable this option to display social links with their native styles."
      >
        <template #activator="{ props }">
          <Icon name="solar:info-circle-linear" v-bind="props" />
        </template>
      </v-tooltip>
    </template>
  </v-switch>

  <ImageDropDialog
    v-model="editorStore.imageDropDialog"
    @picked="imagePicked"
  />
</template>
<script setup lang="ts">
const imageEditor = useImageEditor();
const editorStore = useCardEditorStore();
const imagePicked = (image: string) => {
  imageEditor.onOpen(image);
};

// The image slots are the images that can be edited and appended to the card
// in the card editor. This is the list of available slots.
const imageSlots = reactive([
  {
    image: computed(() => editorStore.coverImagePreview),
    title: "Cover Photo",
    onClick: () => {
      imageEditor.imageSlot = ImageType.Cover;
    },
    onRemoveImage: () => {
      editorStore.card.coverImage = null;
      editorStore.coverImagePreview = "";
    },
    flex: 4,
    margin: "pa-0 mr-7",
  },
  {
    image: computed(() => editorStore.avatarImagePreview),
    title: "Profile Picture",
    rounded: true,
    onClick: () => {
      imageEditor.imageSlot = ImageType.Avatar;
    },
    flex: 3,
    margin: "pa-0 mr-5",
    onRemoveImage: () => {
      editorStore.card.avatarImage = null;
      editorStore.avatarImagePreview = "";
    },
  },
  {
    title: "Company Logo",
    rounded: true,
    onClick: () => {},
    flex: 2,
    margin: "pa-0",
  },
]);
</script>
