import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExamResultsPage } from './exam-results.page';

describe('ExamResultsPage', () => {
  let component: ExamResultsPage;
  let fixture: ComponentFixture<ExamResultsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamResultsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExamResultsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
