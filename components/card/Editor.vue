<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" lg="7" xl="5" class="pa-0">
        <CardPresentation :card="card" :image="backgroundImage">
          <template #header>
            <Preview
              v-if="editorStore.editorResult"
              :width="500"
              :height="330"
              :image="editorStore.editorResult.image"
              :coordinates="editorStore.editorResult.coordinates"
            />
          </template>
          <CardActionButton
            icon="mdi-pencil"
            tooltip="Edit Card"
            @click="pickImage"
          />
        </CardPresentation>
      </v-col>

      <v-col cols="12" sm="8" lg="5" xl="4" class="mt-16 pa-2 text-center">
        <v-expansion-panels v-if="!editingImage">
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
        </v-expansion-panels>
        <div v-else>
          <ImageEditor />
          <v-btn @click="editingImage = false"> Exit </v-btn>
        </div>
        <ImageCard title="Profile picture" @click="showDialog = true" />
        <v-btn
          variant="tonal"
          class="mt-6 text-capitalize"
          icon="mdi-check-bold"
          @click="$emit('onFinish')"
        />
      </v-col>
    </v-row>
    <FileDropDialog v-model="showDialog" @close="" @filepicked="onFilePicked" />
  </v-container>
</template>

<script setup lang="ts">
import { CreateCardDTO } from "~~/api/dtos/card.dto";
import { useCardEditorStore } from "~~/stores/card-editor.store";
import { Preview } from "vue-advanced-cropper";
defineEmits(["onFinish"]);
defineProps<{
  card: CreateCardDTO;
  loading: boolean;
  mode: "create" | "edit";
}>();

const editorStore = useCardEditorStore();
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

const pickImage = () => {
  showDialog.value = true;
};

const onFilePicked = (f: string) => {
  closeDialog();
  editorStore.profilePicImage = f;
  editingImage.value = true;
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
