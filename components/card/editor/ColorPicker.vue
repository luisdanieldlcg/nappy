<template>
  <v-row>
    <v-col cols="1">
      <div>
        <ColorCard :multi-color="true" @click="openColorPicker" />
      </div>
    </v-col>
    <v-col v-for="color in availableColors" cols="1">
      <ColorCard :color="color" @click="pickColor(color)" />
    </v-col>
  </v-row>
  <v-dialog v-model="showColorPicker" class="text-center">
    <v-color-picker
      show-swatches
      v-model="store.card.color"
      class="mx-auto "
    ></v-color-picker>
  </v-dialog>
</template>

<script setup lang="ts">
// I need to remove the v-dialog overlay from the color picker
const store = useCardEditorStore();
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

const pickColor = (selection: string) => {
  store.card.color = selection;
};
</script>
