export interface UserListTableRowProps {
  item: {
    id: string;
    name: string;
    email: string;
    userGroup: string;
    status: string;
  };
  index: number;
  onDelete?: (item: any) => void;
  statusClassName?: string;
}
