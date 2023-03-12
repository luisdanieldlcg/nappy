export const useDashStore = defineStore("dash", () => {
  const sidebarCollapsed = ref(false);

  return {
    sidebarCollapsed,
  };
});
