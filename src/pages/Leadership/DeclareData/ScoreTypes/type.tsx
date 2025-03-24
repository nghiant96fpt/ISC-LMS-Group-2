export interface IScoreType {
  id: number;
  name: string;
  coefficient: number;
  semester1: number;
  semester2: number;
}

export interface GradeTypeFormData {
  gradeTypeName: string;
  coefficient: string;
  semester1: string;
  semester2: string;
}
