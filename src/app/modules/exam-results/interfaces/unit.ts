import { Exam } from './exam';

export interface Unit {
  readonly name: string;
  readonly credits: string;
  readonly finalGrade: string;
  readonly no: string;
  readonly exams: readonly Exam[];
  readonly status: string;
}
