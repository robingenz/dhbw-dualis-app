import { Exam } from './exam';

export interface Unit {
  id: string;
  displayName: string;
  no: string;
  finalGrade: string;
  credits: string;
  status: string;
  exams: Exam[] | undefined;
}
