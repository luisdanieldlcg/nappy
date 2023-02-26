<template>
  <v-tooltip :text="tooltip" v-model="showTooltip" location="top">
    <template #activator="{ props }">
      <div class="d-inline" v-bind="$attrs">
        <v-btn
          variant="outlined"
          size="small"
          icon
          color="white"
          class="ma-2"
          v-bind="props"
          @click="onClick"
        >
          <!--Disabled dude to a bug when navigating to the card editor.
    It was attaching the tooltip to the view when you navigate and there was no way to remove it.-->
          <v-icon>{{ icon }}</v-icon>
        </v-btn>
      </div>
    </template>
  </v-tooltip>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "action"): void;
}>();
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
const showTooltip = ref(false);
const onClick = () => {
  showTooltip.value = false;
  emit("action");
};
</script>
