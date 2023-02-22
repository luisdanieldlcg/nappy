<template>
  <v-btn variant="outlined" size="small" icon color="white" class="ma-2">
    <!--Disabled dude to a bug when navigating to the card editor.
    It was attaching the tooltip to the view when you navigate and there was no way to remove it.-->
    <!-- <v-tooltip activator="parent" :text="tooltip" location="top center" /> -->
    <v-icon>{{ icon }}</v-icon>
  </v-btn>
</template>

<script setup lang="ts">
defineProps({
  icon: {
    type: String,
    required: true,
  },
  tooltip: {
    type: String,
    required: true,
  },
});
</script>
