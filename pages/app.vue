<template>
  <div>
    <v-navigation-drawer style="border: none" :rail="rail" permanent>
      <v-list-item
        nav
        prepend-avatar="https://apprecs.org/ios/images/app-icons/256/24/851990820.jpg"
      >
        <v-list-item-title style="font-size: 24px; padding: 20px">
          Nap<span class="text-grey">py</span>
        </v-list-item-title>
        <template #prepend> </template>
      </v-list-item>
      <v-row>
        <v-list-item
          class="ml-1"
          prepend-avatar="https://cdn.vuetifyjs.com/images/john.png"
          title="Luis de la Cruz"
          subtitle="SuperAdmin"
        >
          <template #append>
            <ProfileMenu />
          </template>
        </v-list-item>
      </v-row>

      <div class="spacer">
        <v-list color="primary" density="comfortable" nav>
          <v-list-item
            class="rounded-lg"
            v-for="entry in items"
            :prepend-icon="entry.icon"
            :to="entry.targetRoute"
            @click="entry.click"
          >
            <template #title>
              {{ entry.title }}
            </template>
          </v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>
    <v-app-bar flat color="background">
      <v-app-bar-nav-icon @click="rail = !rail" />
      <v-spacer></v-spacer>
      <div class="mt-5 mr-7">
        <ThemeSwitcher />
      </div>
    </v-app-bar>
    <v-main>
      <v-container class="my-8 mx-10">
        <NuxtPage />
      </v-container>
    </v-main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth_store";
definePageMeta({
  middleware: "auth",
});
const rail = ref(false);

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
    title: "Cards",
    icon: "mdi-card-account-details",
    targetRoute: "/app/cards",
  },
  {
    title: "Contacts",
    icon: "mdi-account-group-outline",
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
    loading: false,
    click: async function () {
      const authController = useAuthStore();
      this.loading = true;
      await authController.signOut({
        onError(err) {},
        onSuccess(response) {
          return navigateTo("/");
        },
      });
      this.loading = false;
    },
  },
];
</script>

<style></style>
