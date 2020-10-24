import { Unit } from './unit';

export interface Semester {
  readonly gpa: number;
  readonly totalCredits: number;
  readonly units: readonly Unit[];
}
