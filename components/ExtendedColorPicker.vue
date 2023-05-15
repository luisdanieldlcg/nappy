<template>
  <v-row>
    <v-col cols="1" class="pa-0">
      <ColorCard
        :multi-color="true"
        @click="openColorPicker"
        :outline="!availableColors.includes(modelValue)"
      />
    </v-col>
    <v-col v-for="color in availableColors" cols="1" class="pa-0">
      <ColorCard
        :color="color"
        @click="$emit('update:modelValue', color)"
        :outline="modelValue === color"
      />
    </v-col>
  </v-row>
  <v-dialog v-model="showColorPicker" class="text-center">
    <v-color-picker
      show-swatches
      :model-value="modelValue"
      @update:model-value="(selection) => $emit('update:modelValue', selection)"
      class="mx-auto"
    ></v-color-picker>
  </v-dialog>
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const showColorPicker = ref(false);
const availableColors = [
  Colors.red,
  Colors.aqua,
  Colors.blue,
  Colors.green,
  Colors.purple,
  Colors.brownLight,
  Colors.black,
  Colors.greyLight,
];

const openColorPicker = () => {
  showColorPicker.value = true;
};
</script>
