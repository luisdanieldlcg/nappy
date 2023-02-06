/**
 * Configuration for dashboard pages.
 */
export const dashboardPages = [
  {
    title: "Overview",
    titleIcon: "mdi-chart-line",
    sidebarItemIcon: "mdi-view-dashboard-outline",
    sidebarItemProp: {
      class: "rounded-lg",
    },
    targetRoute: "/app/overview",
  },
  {
    title: "Members",
    titleIcon: "mdi-account-group-outline",
    sidebarItemIcon: "mdi-account-group-outline",
    targetRoute: "/app/members",
  },
  {
    title: "Cards",
    titleIcon: "mdi-card-account-details-outline",
    withCreateButton: true,
    sidebarItemIcon: "mdi-card-account-details-outline",
    targetRoute: "/app/cards",
  },
  {
    title: "Contacts",
    titleIcon: "mdi-contacts-outline",
    sidebarItemIcon: "mdi-contacts-outline",
    targetRoute: "/app/contacts",
  },
  {
    title: "Settings",
    titleIcon: "mdi-cog-outline",
    sidebarItemIcon: "mdi-cog-outline",
    targetRoute: "/app/settings",
  },
  {
    title: "Logout",
    sidebarItemIcon: "mdi-logout",
    titleIcon: "",
    click: async () => {
      // const authController = useAuthStore();
      // const result = await authController.logOut();
      // if (result.isOk) {
      //   return navigateTo("/");
      // }
    },
  },
];
