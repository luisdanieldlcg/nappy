/**
 * Configuration for dashboard pages.
 */
export const dashboardPages = [
  {
    title: "Overview",
    titleIcon: "mdi-chart-line",
    sidebarIcon: "mdi-view-dashboard-outline",
    targetRoute: "/app/overview",
    props: {
      class: "rounded-lg",
    },
  },
  {
    title: "Members",
    titleIcon: "mdi-account-group-outline",
    sidebarIcon: "mdi-account-group-outline",
    targetRoute: "/app/members",
  },
  {
    title: "Cards",
    titleIcon: "mdi-card-account-details-outline",
    sidebarIcon: "mdi-card-account-details-outline",
    targetRoute: "/app/cards",
  },
  {
    title: "Contacts",
    titleIcon: "mdi-contacts-outline",
    sidebarIcon: "mdi-contacts-outline",
    targetRoute: "/app/contacts",
  },
  {
    title: "Settings",
    titleIcon: "mdi-cog-outline",
    sidebarIcon: "mdi-cog-outline",
    targetRoute: "/app/settings",
  },
  {
    title: "Logout",
    sidebarIcon: "mdi-logout",
    click: async () => {
      // const authController = useAuthStore();
      // const result = await authController.logOut();
      // if (result.isOk) {
      //   return navigateTo("/");
      // }
    },
  },
];
