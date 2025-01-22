export interface MenuItem {
    label: string;
    link: string;
    isActive?: boolean;
  }
  
  export interface MenuProps {
    items: MenuItem[];
  }
  