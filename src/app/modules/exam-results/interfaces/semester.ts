import { Unit } from './unit';

export interface Semester {
  readonly id: string;
  readonly displayName: string;
  readonly gpa: string;
  readonly totalCredits: string;
  readonly units: readonly Unit[];
}
