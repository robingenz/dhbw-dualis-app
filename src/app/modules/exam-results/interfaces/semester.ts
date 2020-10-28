import { Unit } from './unit';

export interface Semester {
  id: string;
  displayName: string;
  gpa: string;
  totalCredits: string;
  units: Unit[];
}
