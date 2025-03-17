import { TableColumn } from "./type";

export const columns: TableColumn[] = [
  { key: "studentCode", label: "Mã học viên" },
  { key: "studentName", label: "Tên học viên" },
  { key: "dateOfBirth", label: "Ngày sinh", isDate: true },
  { key: "gender", label: "Giới tính" },
  { key: "classRetention", label: "Lớp bảo lưu" },
  { key: "retentionDate", label: "Ngày bảo lưu", isDate: true },
  { key: "retentionPeriod", label: "Thời gian bảo lưu" },
  { key: "retentionReason", label: "Lý do" },
];
