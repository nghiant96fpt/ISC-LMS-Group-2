export interface Teacher {
  id: number;
  teacherCode: string;
  fullName: string;
  birthDate: string;
  gender: boolean;
  subjectGroupName: string;
  position: string;
  status: number;
}

export interface TeacherResponse {
  code: number;
  message: string;
  data: Teacher[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
