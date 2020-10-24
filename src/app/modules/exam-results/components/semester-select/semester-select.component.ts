import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectChangeEventDetail } from '@ionic/core';
import { SemesterList } from '../../interfaces';
import { Semester } from '../../interfaces/semester';

@Component({
  selector: 'app-semester-select',
  templateUrl: './semester-select.component.html',
  styleUrls: ['./semester-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SemesterSelectComponent {
  @Input()
  public semesterList: SemesterList | undefined;
  @Output()
  public selectSemester: EventEmitter<Semester> = new EventEmitter<Semester>();

  constructor() {}

  // TODO: remove any
  public onSemesterSelect(event: SelectChangeEventDetail<any>): void {
    console.log(event);
    // this.selectSemester.emit(event.value);
  }
}
