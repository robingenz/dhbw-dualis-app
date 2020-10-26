import { TestBed } from '@angular/core/testing';
import { AuthenticationService, NativeHttpService } from '@app/core';
import { Session } from '@app/core/interfaces';
import { HttpResponse } from '@capacitor-community/http';
import { SemesterList } from '../../interfaces';
import { ExamResultsPageService } from './exam-results-page.service';

describe('ExamResultsPageService', () => {
  let service: ExamResultsPageService;
  let nativeHttpServiceSpy: jasmine.SpyObj<NativeHttpService>;
  let authServiceSpy: jasmine.SpyObj<AuthenticationService>;

  beforeEach(() => {
    nativeHttpServiceSpy = jasmine.createSpyObj('NativeHttpService', ['request']);
    authServiceSpy = jasmine.createSpyObj('AuthenticationService', {
      getSession: { key: '-N111222333444555', expirationTimestamp: 1000 } as Session,
    });

    TestBed.configureTestingModule({
      providers: [{ provide: NativeHttpService, useValue: nativeHttpServiceSpy }],
    });
    service = TestBed.inject(ExamResultsPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  xit('should return the correct parsed semester list', async () => {
    nativeHttpServiceSpy.request.and.callFake(() => {
      return Promise.resolve<HttpResponse>({
        data: `<div class="formRow">
                <div class="inputFieldLabel long">
                  <label for="semester">Semester:</label>
                  <select id="semester" name="semester">
                    <option value="000000015058000" selected="selected">SU 2020</option>
                    <option value="000000015048000">WI 2019/20</option>
                  </select>
                  <input name="Refresh" type="submit" value="Refresh" class="img img_arrowReload">
                </div>
              </div>`,
        headers: {},
        status: 200,
      });
    });
    const exspectedResult: SemesterList = [
      {
        id: '000000015058000',
        displayName: 'SU 2020',
      },
      {
        id: '000000015048000',
        displayName: 'WI 2019/20',
      },
    ];
    const list = await service.getSemesterList();
    expect(list).toEqual(exspectedResult);
  });
});
