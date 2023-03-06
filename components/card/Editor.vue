<template>
  <v-row justify="center">
    <v-col cols="10" sm="8" md="6" lg="4" xl="3" class="mr-12">
      <CardPresentation :card="card" :image="backgroundImage">
        <template #header>
          <Preview
            v-if="editorStore.editorResult"
            :width="500"
            :height="250"
            :image="editorStore.editorResult.image"
            :coordinates="editorStore.editorResult.coordinates"
          />
        </template>
        <CardActionButton
          icon="mdi-pencil"
          :tooltip="mode === 'edit' ? 'Edit Background' : 'Edit Card'"
          @action="onEditClicked"
        />
      </CardPresentation>
    </v-col>
    <v-col cols="10" sm="8" md="4" lg="4" xl="3" class="mt-16 pa-2 text-center">
      <v-expansion-panels v-if="!editingImage" style="max-width: 400px">
        <v-progress-linear
          :indeterminate="loading"
          :active="loading"
        ></v-progress-linear>
        <TextField
          label="Card Title"
          hint="Enter the title for this card"
          v-model="card.label"
        />
        <DashFieldExpansion title="Full Name">
          <TextField label="First Name" v-model="card.firstName" />
          <TextField label="Last Name" v-model="card.lastName" />
        </DashFieldExpansion>

        <DashFieldExpansion title="More details">
          <TextField label="Job Title" v-model="card.jobTitle" />
          <TextField label="Company Name" v-model="card.company" />
        </DashFieldExpansion>

        <div>
          <ImageCard title="Profile picture" @click="showDialog = true" />
          <v-btn
            variant="tonal"
            class="mt-6 text-capitalize"
            icon="mdi-check-bold"
            @click="sendForm"
          />
        </div>
      </v-expansion-panels>

      <template v-else>
        <ImageEditor />
        <v-btn @click="editingImage = false" variant="tonal" class="mr-16 mt-7">
          Done
        </v-btn>
        <div class="pr-7 d-inline"></div>
      </template>
    </v-col>
  </v-row>

  <FileDropDialog v-model="showDialog" @close="" @filepicked="onFilePicked" />
</template>

<script setup lang="ts">
import { CreateCardDTO } from "~~/api/dtos/card.dto";
import { useCardEditorStore } from "~~/stores/card-editor.store";
import { Preview } from "vue-advanced-cropper";

const emit = defineEmits<{
  (e: "onFinish", form: FormData): void;
}>();
const props = defineProps<{
  card: CreateCardDTO;
  loading: boolean;
  mode: "create" | "edit";
}>();
const form = new FormData();

const editorStore = useCardEditorStore();
// Quick dirty fix for avoiding rendering Preview image component
// after the image is chosen and the screen is reset.
editorStore.editorResult = undefined;
const editingImage = ref(false);

const showDialog = ref(false);

const backgroundImage = computed(() => {
  return (
    editorStore.profilePicImage ||
    "https://wallpaperaccess.com/full/2774333.jpg"
  );
});

const closeDialog = () => {
  showDialog.value = false;
};

const onEditClicked = async () => {
  if (props.mode === "edit") {
    editingImage.value = true;
  } else {
    showDialog.value = true;
  }
};

const onFilePicked = (file: string) => {
  closeDialog();
  editorStore.profilePicImage = file;
  editingImage.value = true;
};
const sendForm = () => {
  Object.entries(props.card).forEach(([key, value]) => {
    form.append(key, value);
  });
  emit("onFinish", form);
};
</script>

<style scoped>
/*
	It may be necessary to set limits on the size of the cropper, otherwise the cropper image will try to fill all the available space.
*/
.cropper {
  height: 300px;
  width: 300px;
  background: #ddd;
}
</style>
