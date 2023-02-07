export interface DashPageHeader {
  title: string;
  icon: string;
  renderCreateButton: boolean;
  target: string;
}

export const dashPageHeaders: DashPageHeader[] = [
  {
    title: "Overview",
    icon: "mdi-chart-line",
    renderCreateButton: false,
    target: "/app/overview",
  },
  {
    title: "Members",
    icon: "mdi-account-group-outline",
    renderCreateButton: false,
    target: "/app/members",
  },
  {
    title: "Cards",
    icon: "mdi-card-account-details-outline",
    renderCreateButton: true,
    target: "/app/cards",
  },
  {
    title: "Contacts",
    icon: "mdi-contacts-outline",
    renderCreateButton: false,
    target: "/app/contacts",
  },
  {
    title: "Settings",
    icon: "mdi-cog-outline",
    renderCreateButton: false,
    target: "/app/settings",
  },
  {
    title: "Create a New Card",
    icon: "mdi-card-account-details-outline",
    target: "/app/cards/create",
    renderCreateButton: false,
  },
];
