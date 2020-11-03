import { TestBed } from '@angular/core/testing';
import { AuthenticationService, NativeHttpService, Session } from '@app/core';
import { DualisHtmlParserService } from '../dualis-html-parser/dualis-html-parser.service';
import { ExamResultsPageService } from './exam-results-page.service';

describe('ExamResultsPageService', () => {
  let service: ExamResultsPageService;
  let nativeHttpServiceSpy: jasmine.SpyObj<NativeHttpService>;
  let authServiceSpy: jasmine.SpyObj<AuthenticationService>;
  let dualisHtmlParserServiceSpy: jasmine.SpyObj<DualisHtmlParserService>;

  beforeEach(() => {
    nativeHttpServiceSpy = jasmine.createSpyObj('NativeHttpService', ['request']);
    dualisHtmlParserServiceSpy = jasmine.createSpyObj('DualisHtmlParserService', [
      'parseSemesterList',
      'parseSemesterCredits',
      'parseSemesterGpa',
      'parseUnits',
      'parseExams',
    ]);
    authServiceSpy = jasmine.createSpyObj('AuthenticationService', {
      getSession: new Session('123'),
    });

    TestBed.configureTestingModule({
      providers: [
        { provide: NativeHttpService, useValue: nativeHttpServiceSpy },
        { provide: DualisHtmlParserService, useValue: dualisHtmlParserServiceSpy },
        { provide: AuthenticationService, useValue: authServiceSpy },
      ],
    });
    service = TestBed.inject(ExamResultsPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
