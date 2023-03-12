<template>
  <v-dialog>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4" class="pa-0">
        <v-card
          class="pa-10 text-center font-weight-bold"
          elevation="0"
          :loading="loading"
        >
          <div class="mb-2">
            <v-icon
              icon="mdi-alert-circle-outline"
              color="grey-subtitle"
              size="40"
            ></v-icon>
          </div>
          <p class="text-grey-subtitle text-h6 font-weight-bold">
            {{ title }}
          </p>
          <v-card-subtitle>
            <v-card-text> {{ subtitle }} </v-card-text>
          </v-card-subtitle>
          <v-card-actions class="justify-center">
            <v-btn
              class="text-capitalize mr-1"
              variant="outlined"
              @click="$emit('close')"
              >Cancel
            </v-btn>

            <slot name="actions"></slot>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-dialog>
</template>

<script setup lang="ts">
defineEmits(["close"]);
defineProps({
  loading: {
    type: Boolean,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
});
</script>
