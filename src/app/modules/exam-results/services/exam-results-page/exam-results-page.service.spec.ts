import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from '@app/core';
import { Session } from '@app/core/interfaces';
import { HTTP } from '@ionic-native/http/ngx';
import { ExamResultsPageService } from './exam-results-page.service';

describe('ExamResultsPageService', () => {
  let service: ExamResultsPageService;
  let httpSpy: jasmine.SpyObj<HTTP>;
  let authServiceSpy: jasmine.SpyObj<AuthenticationService>;

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HTTP', ['get']);
    authServiceSpy = jasmine.createSpyObj('AuthenticationService', {
      getSession: { key: '-N111222333444555', expirationTimestamp: 1000 } as Session,
    });

    TestBed.configureTestingModule({
      providers: [{ provide: HTTP, useValue: httpSpy }],
    });
    service = TestBed.inject(ExamResultsPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
