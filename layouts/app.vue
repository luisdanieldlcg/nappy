<template>
  <div>
    <v-navigation-drawer>
      <v-list :items="items"> </v-list>
    </v-navigation-drawer>
    <v-app-bar elevation="1.0">
      <v-app-bar-title> Dashboard </v-app-bar-title>
      <v-list>
        <v-list-item
          prepend-avatar="https://cdn.vuetifyjs.com/images/john.png"
          title="Luis de la Cruz"
          subtitle="danikingrd@gmail.com"
        >
        </v-list-item>
      </v-list>
    </v-app-bar>
    <v-main> main </v-main>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const items = [
  {
    title: "Overview",
    props: {
      prependIcon: "mdi-view-dashboard-outline",
      to: "/app/overview",
    },
  },
  {
    title: "Cards",
    props: {
      prependIcon: "mdi-card-account-details",
      to: "/app/cards",
    },
  },
  {
    title: "Contacts",
    props: {
      prependIcon: "mdi-account-box",
      to: "/app/contacts",
    },
  },
];
</script>

<style scoped></style>
