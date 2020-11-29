import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthenticationService, DialogService } from '@app/core';
import { IonicModule } from '@ionic/angular';
import { ExamResultsPageService } from '../../services';
import { ExamResultsPage } from './exam-results.page';

describe('ExamResultsPage', () => {
  let component: ExamResultsPage;
  let fixture: ComponentFixture<ExamResultsPage>;
  let element: HTMLElement;
  let dialogServiceSpy: jasmine.SpyObj<DialogService>;
  let authServiceSpy: jasmine.SpyObj<AuthenticationService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let cdrSpy: jasmine.SpyObj<ChangeDetectorRef>;
  let examResultsPageServiceSpy: jasmine.SpyObj<ExamResultsPageService>;
  let ionDialogElement: { dismiss: () => Promise<boolean> };

  beforeEach(
    waitForAsync(() => {
      ionDialogElement = { dismiss: () => Promise.resolve(true) };
      dialogServiceSpy = jasmine.createSpyObj('DialogService', {
        showErrorAlert: ionDialogElement,
        showLoading: ionDialogElement,
      });
      authServiceSpy = jasmine.createSpyObj('AuthenticationService', ['logout']);
      routerSpy = jasmine.createSpyObj('Router', ['navigate']);
      cdrSpy = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);
      examResultsPageServiceSpy = jasmine.createSpyObj('ExamResultsPageService', [
        'getSemesterList',
        'getSemesterByListItem',
      ]);

      TestBed.configureTestingModule({
        declarations: [ExamResultsPage],
        imports: [IonicModule.forRoot()],
        providers: [
          { provide: DialogService, useValue: dialogServiceSpy },
          { provide: AuthenticationService, useValue: authServiceSpy },
          { provide: Router, useValue: routerSpy },
          { provide: ChangeDetectorRef, useValue: cdrSpy },
          { provide: ExamResultsPageService, useValue: examResultsPageServiceSpy },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ExamResultsPage);
      component = fixture.componentInstance;
      element = fixture.nativeElement;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
