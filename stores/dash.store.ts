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
    icon: "solar-chart-linear",
    navigateTo: "/app/overview",
  },
  {
    title: "Members",
    icon: "solar-users-group-rounded-outline",
    navigateTo: "/app/members",
  },
  {
    title: "Cards",
    icon: "solar-user-id-outline",
    navigateTo: "/app/cards",
  },
  {
    title: "Contacts",
    icon: "solar-book-2-outline",
    navigateTo: "/app/contacts",
  },
  {
    title: "Settings",
    icon: "solar-settings-linear",
    navigateTo: "/app/settings",
  },
  {
    title: "Logout",
    icon: "solar-exit-outline",
    async onClick() {
      // const controller = useAuthStore();
      // const result = await controller.logOut();
      // if (result.isOk) {
      //   navigateTo("/");
      // }
    },
  },
];
