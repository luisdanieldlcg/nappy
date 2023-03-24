<template>
  <DividedGrid>
    <template #left>
      <CardContainer
        :height="400"
        :width="300"
        :imageHeight="160"
        :avatar-size="100"
      />
    </template>
    <template #right>
      <CardEditorFields  />
    </template>
  </DividedGrid>
</template>

<script setup lang="ts">
import { ICardDTO } from "~~/api/dtos/card.dto";

</script>

<style lang="scss" scoped></style>
