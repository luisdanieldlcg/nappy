<template>
  <v-navigation-drawer
    rail
    style="border: none"
    :order="1"
    color="background"
    permanent
  >
    <v-list color="primary" density="comfortable" nav>
      <v-list-item
        class="rounded-lg"
        v-for="entry in items"
        :prepend-icon="entry.icon"
        :to="entry.targetRoute"
        @click="entry.click"
        density="compact"
        variant="text"
        active-color="primary"
      >
        <v-list-item-title
          v-text="entry.title"
          class="text-subtitle-2"
        ></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useAuthStore } from "~~/stores/auth_store";
defineEmits(["showDrawer"]);
const items = [
  {
    title: "Overview",
    icon: "mdi-view-dashboard-outline",
    targetRoute: "/app/overview",
    props: {
      class: "rounded-lg",
    },
  },
  {
    title: "Members",
    icon: "mdi-account-group-outline",
    targetRoute: "/app/members",
  },
  {
    title: "Cards",
    icon: "mdi-card-account-details-outline",
    targetRoute: "/app/cards",
  },
  {
    title: "Contacts",
    icon: "mdi-contacts-outline",
    targetRoute: "/app/contacts",
  },
  {
    title: "Settings",
    icon: "mdi-cog-outline",
    targetRoute: "/app/settings",
  },
  {
    title: "Logout",
    icon: "mdi-logout",
    click: async () => {
      const authController = useAuthStore();
      const result = await authController.logOut();
      if (result.isOk) {
        return navigateTo("/");
      }
    },
  },
];
</script>

<style scoped></style>
