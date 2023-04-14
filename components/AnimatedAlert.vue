<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="7" md="6" lg="4" xs="5">
          <v-expand-transition>
            <div v-if="show">
              <v-alert
                v-bind="$attrs"
                :value="modelValue"
                border="start"
                type="error"
                variant="tonal"
                color="#000000"
                closable
              >
              <template #prepend>
                <Icon name="mdi:alert-circle-outline"/>
              </template>
                <template #close>
                  <v-btn
                    density="compact"
                    @click="$emit('update:modelValue', $event.target.value)"
                  />
                </template>
                <slot> </slot>
              </v-alert>
            </div>
          </v-expand-transition>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  modelValue: Boolean,
});
defineEmits(["update:modelValue"]);
</script>

<style scoped></style>
