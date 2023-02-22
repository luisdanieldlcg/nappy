<template>
  <v-dialog>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4" class="pa-0">
        <v-card class="pa-10 text-center font-weight-bold" elevation="0">
          <v-icon
            icon="mdi-alert-circle-outline"
            color="grey-subtitle"
            size="40"
            class="mb-2"
          ></v-icon>
          <p class="text-grey-subtitle text-h6 font-weight-bold">
            Are you sure?
          </p>
          <v-card-text>
            This card will be permanently deleted and cannot be restored.
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn
              class="text-capitalize"
              variant="outlined"
              @click="$emit('close')"
              >Cancel
            </v-btn>
            <v-btn class="text-capitalize bg-primary" @click="$emit('trigger')">
              Delete Card</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-dialog>
</template>

<script setup lang="ts">
defineEmits(["close", "trigger"]);
</script>
