<template>
  <v-card>
    <v-file-input class="hidden-input"></v-file-input>
    dasdsa
  </v-card>
  <label for="fileInput" class="file-label">
    <!-- <div v-if="isDragging">Release to drop files here.</div>
    <div v-else>Drop files here or <u>click here</u> to upload.</div> -->
  </label>
</template>

<script setup lang="ts">
const onChange = () => {

}
const dragOver = () => {

}
const drageLeave = () => {

}
const drop = () => {

}
</script>
g
<style scoped>
.hidden-input {
  opacity: 0;
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
}
</style>
