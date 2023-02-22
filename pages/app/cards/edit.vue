<template>
  <NuxtLayout name="dashboard">
    <CardEditor :card="dto" @on-finish="save" :loading="view.isLoading()" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { CreateCardDTO } from "~~/api/dtos/card.dto";

const view = new ViewState();
const dto = reactive<CreateCardDTO>({
  id: "",
  label: "Work",
  firstName: "Luis",
  lastName: "de la Cruz",
  jobTitle: "",
  company: "",
});

const save = async () => {};
</script>
