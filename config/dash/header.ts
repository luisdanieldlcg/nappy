export interface DashPageHeader {
  title: string;
  icon: string;
  target: string;
  navigateTo?: string;
}

export const dashPageHeaders: DashPageHeader[] = [
  {
    title: "Overview",
    icon: "mdi-chart-line",
    target: "/app/overview",
  },
  {
    title: "Members",
    icon: "mdi-account-group-outline",
    target: "/app/members",
  },
  {
    title: "Cards",
    icon: "mdi-card-account-details-outline",
    navigateTo: '/app/cards/create',
    target: "/app/cards",
  },
  {
    title: "Contacts",
    icon: "mdi-contacts-outline",
    target: "/app/contacts",
  },
  {
    title: "Settings",
    icon: "mdi-cog-outline",
    target: "/app/settings",
  },
  {
    title: "Create a New Card",
    icon: "mdi-card-account-details-outline",
    target: "/app/cards/create",
  },
];
