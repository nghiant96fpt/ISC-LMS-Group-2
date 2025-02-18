export interface ClassItem {
    id: string;
    code: string;
    name: string;
}

export interface ClassListProps {
    data: ClassItem[];
    selectedItems: string[];
    onSelect: (id: string) => void;
    onDelete: () => void;
    onSelectAll: () => void;
    isAllSelected: boolean;
    onClose: () => void;
}