export type SemesterList = readonly SemesterListItem[];

export interface SemesterListItem {
  readonly id: string;
  readonly displayName: string;
}
