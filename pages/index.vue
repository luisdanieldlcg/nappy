<template>
  <div>
    <v-menu :close-on-content-click="false" location="end">
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          size="small"
          variant="text"
          icon="mdi-menu-down"
        ></v-btn>
      </template>

      <v-card min-width="300">
        <v-list>
          <v-list-item
            prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
            title="John Leider"
            subtitle="Founder of Vuetify"
          >
            <template v-slot:append>
              <v-btn variant="text"></v-btn>
            </template>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-switch
              color="purple"
              label="Enable messages"
              hide-details
            ></v-switch>
          </v-list-item>

          <v-list-item>
            <v-switch
              color="purple"
              label="Enable hints"
              hide-details
            ></v-switch>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn variant="text"> Cancel </v-btn>
          <v-btn color="primary" variant="text"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  redirect: "/login",
});
</script>

<style scoped></style>
