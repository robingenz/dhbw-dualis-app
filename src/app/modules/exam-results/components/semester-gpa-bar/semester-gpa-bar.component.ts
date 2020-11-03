import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Semester } from '../../interfaces';

@Component({
  selector: 'app-semester-gpa-bar',
  templateUrl: './semester-gpa-bar.component.html',
  styleUrls: ['./semester-gpa-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SemesterGpaBarComponent {
  @Input()
  public semester: Semester | undefined;

  constructor() {}
}
