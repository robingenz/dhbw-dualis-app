import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SemesterGpaBarComponent } from './semester-gpa-bar.component';

describe('SemesterGpaBarComponent', () => {
  let component: SemesterGpaBarComponent;
  let fixture: ComponentFixture<SemesterGpaBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SemesterGpaBarComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(SemesterGpaBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
