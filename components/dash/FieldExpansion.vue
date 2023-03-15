<template>
  <v-container class="pa-0 pt-4">
    <v-expansion-panel elevation="0" color="grey-lighten-3" bg-color="background" v-bind="$attrs">
      
      <v-expansion-panel-text>
        <slot></slot>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-container>
</template>

<script setup lang="ts"></script>

<style scoped></style>
