import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SelectChangeEventDetail } from '@ionic/core';
import { SharedTestingModule } from '@tests/modules';
import { SemesterListItem } from '../../interfaces';
import { SemesterSelectComponent } from './semester-select.component';

describe('SemesterSelectComponent', () => {
  let component: SemesterSelectComponent;
  let fixture: ComponentFixture<SemesterSelectComponent>;
  let element: HTMLElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SemesterSelectComponent],
        imports: [SharedTestingModule],
      }).compileComponents();

      fixture = TestBed.createComponent(SemesterSelectComponent);
      component = fixture.componentInstance;
      element = fixture.nativeElement;
      fixture.detectChanges();
    }),
  );

  afterEach(() => {
    fixture.nativeElement.remove();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display ion-item', () => {
    component.semesterList = [{ id: '', displayName: '' }];
    fixture.detectChanges();
    const ionItemElm = element.querySelector('ion-item');
    expect(ionItemElm).toBeTruthy();
  });

  it('should not display ion-item', () => {
    component.semesterList = [];
    fixture.detectChanges();
    const ionItemElm = element.querySelector('ion-item');
    expect(ionItemElm).toBeNull();
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

  it('should display the select options', () => {
    component.semesterList = [
      { id: '1', displayName: '1' },
      { id: '2', displayName: '2' },
    ];
    fixture.detectChanges();
    const list = element.querySelectorAll('ion-select-option');
    expect(list.length).toBe(2);
  });
});
