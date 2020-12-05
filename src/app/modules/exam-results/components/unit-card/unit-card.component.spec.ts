import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { EmptyStringPipe } from '../../pipes';
import { UnitCardComponent } from './unit-card.component';

describe('UnitCardComponent', () => {
  let component: UnitCardComponent;
  let fixture: ComponentFixture<UnitCardComponent>;
  let element: HTMLElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [UnitCardComponent, EmptyStringPipe],
        imports: [IonicModule.forRoot()],
      })
        .overrideComponent(UnitCardComponent, {
          set: { changeDetection: ChangeDetectionStrategy.Default },
        })
        .compileComponents();

      fixture = TestBed.createComponent(UnitCardComponent);
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

  it('should display ion-card', () => {
    component.unit = {
      id: '111222111222111',
      displayName: 'Wissenschaftliches Arbeiten',
      no: 'WWI_100',
      status: 'bestanden',
      credits: '5,0',
      finalGrade: 'b',
      exams: undefined,
    };
    fixture.detectChanges();
    const ionItemElm = element.querySelector('ion-card');
    expect(ionItemElm).toBeTruthy();
  });

  it('should not display ion-card', () => {
    component.unit = undefined;
    fixture.detectChanges();
    const ionItemElm = element.querySelector('ion-card');
    expect(ionItemElm).toBeNull();
  });
});
