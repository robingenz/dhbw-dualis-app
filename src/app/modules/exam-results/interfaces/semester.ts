import { Unit } from './unit';

export interface Semester {
  readonly gpa: string;
  readonly totalCredits: string;
  readonly units: readonly Unit[];
}
