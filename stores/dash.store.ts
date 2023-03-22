export const useDashStore = defineStore("dash", () => {
  // Sidebar collapsed state
  const sidebarCollapsed = ref(true);
  // Sidebar v-model value.
  // Will overlap if sm breakpoint is reached
  // Otherwise it will follow the sidebarCollapsed state
  const overlapSidebar = ref(true);
  return {
    sidebarCollapsed,
    overlapSidebar,
  };
});

export interface SidebarItem {
  title: string;
  icon: string;
  navigateTo?: string;
  onClick?: () => void;
}

export const sidebarItems: SidebarItem[] = [
  {
    title: "Overview",
    icon: "mdi-view-dashboard-outline",
    navigateTo: "/app/overview",
  },
  {
    title: "Members",
    icon: "mdi-account-group-outline",
    navigateTo: "/app/members",
  },
  {
    title: "Cards",
    icon: "mdi-card-account-details-outline",
    navigateTo: "/app/cards",
  },
  {
    title: "Contacts",
    icon: "mdi-contacts-outline",
    navigateTo: "/app/contacts",
  },
  {
    title: "Settings",
    icon: "mdi-cog-outline",
    navigateTo: "/app/settings",
  },
  {
    title: "Logout",
    icon: "mdi-logout",
    async onClick() {
      // const controller = useAuthStore();
      // const result = await controller.logOut();
      // if (result.isOk) {
      //   navigateTo("/");
      // }
    },
  },
];
