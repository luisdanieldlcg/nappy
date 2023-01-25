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
      </v-list-item>

      <v-divider></v-divider>
      <v-list>
        <v-list-item
          prepend-avatar="https://cdn.vuetifyjs.com/images/john.png"
          title="Luis de la Cruz"
          subtitle="SuperAdmin"
        >
          <template #append>
            <ProfileMenu />
          </template>
        </v-list-item>
      </v-list>

      <div class="spacer">
        <v-list :items="items" color="primary" density="comfortable" nav />
      </div>
    </v-navigation-drawer>
    <v-app-bar flat color="background">
      <v-app-bar-nav-icon @click="rail = !rail" />
      <v-app-bar-title> Dashboard </v-app-bar-title>
      <ThemeSwitcher />
    </v-app-bar>
    <v-main>
      <v-container class="my-8 mx-10" fluid>
        <NuxtPage />
      </v-container>
    </v-main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
const rail = ref(false);

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
