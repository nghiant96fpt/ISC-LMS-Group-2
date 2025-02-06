export interface MenuItem {
  id: number;
  title: string;
  icon?: string;
  path?: string;
  roles: string[];
  subMenu?: MenuItem[];
}

export interface MenuProps {
  role: string;
}
