import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Unit } from '../../interfaces';

@Component({
  selector: 'app-unit-card',
  templateUrl: './unit-card.component.html',
  styleUrls: ['./unit-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitCardComponent {
  @Input()
  public unit: Unit | undefined;

  constructor() {}
}
