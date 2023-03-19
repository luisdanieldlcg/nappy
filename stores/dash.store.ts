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
