<template>
  <!--Controls top & down-->
  <div class="pt-16 pb-5">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="9" lg="5">
          <div class="text-center">
            <h2 class="text-h4 font-weight-bold mb-6">{{ title }}</h2>
            <p class="text-muted">
              {{ subtitle }}
            </p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
defineProps({
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

<style scoped></style>
