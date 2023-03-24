<template>
  <v-card
    color="white"
    elevation="0"
    class="pr-6"
    :min-width="200"
    :max-width="1000"
  >
    <CardEditorGrid>
      <template #left>
        <component
          :is="leftSide"
          :card="dto"
          :height="400"
          :imageHeight="160"
        />
      </template>
      <template #right>
        <component :is="rightSide" />
      </template>
    </CardEditorGrid>
  </v-card>
</template>

<script setup lang="ts">
import CardContainer from "~/components/card/Container.vue";
import { ICardDTO } from "~~/api/dtos/card.dto";
import Fields from "./Fields.vue";

const leftSide = shallowRef(CardContainer);
const rightSide = shallowRef(Fields);

const dto = reactive<ICardDTO>({
  id: "",
  label: "Work",
  firstName: "Luis",
  lastName: "de la Cruz",
  jobTitle: "",
  company: "",
  coverImage: "",
  color: "red",
  avatarImage: "",
});
</script>

<style scoped></style>
