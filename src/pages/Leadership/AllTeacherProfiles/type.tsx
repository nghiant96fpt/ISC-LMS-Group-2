export interface ResignationFormProps {
  ngayNghi: string;
  ghiChu: string;
  quyetDinhNghiViec: File | null;
  onCancel: () => void;
  onSubmit: (data: { ngayNghi: string; ghiChu: string; quyetDinhNghiViec: File | null }) => void;
}
