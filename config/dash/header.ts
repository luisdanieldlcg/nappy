export interface DashPageHeader {
  title: string;
  icon: string;
  target: string;
  createResourcePath?: string;
  createResourceTooltip?: string;
  saveHandler: () => void;
}
