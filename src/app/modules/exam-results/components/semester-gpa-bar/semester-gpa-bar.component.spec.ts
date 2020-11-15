import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SemesterGpaBarComponent } from './semester-gpa-bar.component';

describe('SemesterGpaBarComponent', () => {
  let component: SemesterGpaBarComponent;
  let fixture: ComponentFixture<SemesterGpaBarComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SemesterGpaBarComponent],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(SemesterGpaBarComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
