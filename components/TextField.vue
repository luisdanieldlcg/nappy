<template>
  <v-text-field
    bg-color="background"
    density="comfortable"
    variant="outlined"
    :type="showText ? 'text' : 'password'"
  >
    
    <template #append-inner v-if="withEye" >
      <Icon :name="eyeIcon" color="grey" @click="showText = !showText" style="cursor: pointer;" />
    </template>
 
    <template #details>
      <slot name="details"></slot>
    </template>
  </v-text-field>
</template>

<script setup lang="ts">

const props = defineProps({
  withEye: {
    type: Boolean,
    default: false,
  },
  mustMatch: {
    type: String,
    required: false,
  },
});
// By default show text if there is no eye property
const showText = ref(!props.withEye);
const eyeIcon = computed(() => {
  if (!props.withEye) {
    return "";
  }
  return showText.value ? "mdi-eye-off" : "mdi-eye";
});
</script>
