<template>
  <div>
    <v-navigation-drawer color="background">
      <v-list-item>
        <v-list-item-title
          class="text-center"
          style="font-size: 24px; padding: 20px"
        >
          Nap<span class="text-primary">py</span>
        </v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <div class="spacer">
        <v-container>
          <v-row>
            <v-col>
              <v-list :items="items" active-color="primary" />
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-navigation-drawer>
    <v-app-bar flat color="background">
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
    <v-main>
      <v-container class="my-8 mx-3" fluid>
        <slot></slot>
      </v-container>
    </v-main>
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
