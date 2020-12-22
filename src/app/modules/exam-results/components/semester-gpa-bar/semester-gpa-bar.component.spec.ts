import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { SemesterGpaBarComponent } from './semester-gpa-bar.component';

describe('SemesterGpaBarComponent', () => {
  let component: SemesterGpaBarComponent;
  let fixture: ComponentFixture<SemesterGpaBarComponent>;
  let element: HTMLElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SemesterGpaBarComponent],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(SemesterGpaBarComponent);
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

  it('should display ion-footer', () => {
    component.semester = { displayName: '', gpa: '1,5', id: '', totalCredits: '10', units: [] };
    fixture.detectChanges();
    const ionItemElm = element.querySelector('ion-footer');
    expect(ionItemElm).toBeTruthy();
  });

  it('should not display ion-footer', () => {
    const ionItemElm = element.querySelector('ion-footer');
    expect(ionItemElm).toBeNull();
  });

  it('should display the select options', () => {
    const [gpa, totalCredits] = ['1,5', '10'];
    component.semester = { displayName: '', gpa, id: '', totalCredits, units: [] };
    fixture.detectChanges();
    const div = element.getElementsByClassName('content-wrapper');
    const spans = div[0].getElementsByTagName('span');
    expect(spans.length).toBe(2);
    expect(spans[0].innerText).toBe('Semester-GPA');
    expect(spans[1].innerText).toBe(`${gpa} (${totalCredits} Credits)`);
  });
});
