import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { SelectChangeEventDetail } from '@ionic/core';
import { SemesterListItem } from '../../interfaces';
import { SemesterSelectComponent } from './semester-select.component';

describe('SemesterSelectComponent', () => {
  let component: SemesterSelectComponent;
  let fixture: ComponentFixture<SemesterSelectComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SemesterSelectComponent],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(SemesterSelectComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a event on semester select', () => {
    spyOn(component.selectSemester, 'emit');
    component.onSemesterSelect(
      new CustomEvent<SelectChangeEventDetail<SemesterListItem>>('', {
        detail: { value: { id: '1', displayName: 'Test' } },
      }),
    );
    expect(component.selectSemester.emit).toHaveBeenCalledWith({ id: '1', displayName: 'Test' });
  });
});
