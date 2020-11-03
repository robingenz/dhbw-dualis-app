import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectChangeEventDetail } from '@ionic/core';
import { SemesterList, SemesterListItem } from '../../interfaces';

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
  public selectSemester: EventEmitter<SemesterListItem> = new EventEmitter<SemesterListItem>();

  constructor() {}

  public onSemesterSelect(event: CustomEvent<SelectChangeEventDetail<SemesterListItem>>): void {
    this.selectSemester.emit(event.detail.value);
  }
}
