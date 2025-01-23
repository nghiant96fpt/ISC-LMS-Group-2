// switchTagTypes.ts
export interface SwitchTagOptions {
  labels: string[];
  defaultActiveTab?: number;
}

export interface SwitchTagProps {
  options: SwitchTagOptions;
  onTabChange?: (id: number) => void;
}
