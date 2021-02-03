import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@capacitor-community/http';
import { NativeHttpService } from '../services';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let nativeHttpServiceSpy: jasmine.SpyObj<NativeHttpService>;

  beforeEach(() => {
    nativeHttpServiceSpy = jasmine.createSpyObj('NativeHttpService', ['request']);

    TestBed.configureTestingModule({
      providers: [{ provide: NativeHttpService, useValue: nativeHttpServiceSpy }],
    });
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in successfully', async () => {
    const sessionKey = '111222333444555';
    nativeHttpServiceSpy.request.and.callFake(() => {
      return Promise.resolve<HttpResponse>({
        url: '',
        headers: {
          refresh: `0; URL=/scripts/mgrqispi.dll?APPNAME=CampusNet&PRGNAME=STARTPAGE_DISPATCH&ARGUMENTS=-N${sessionKey},-N000311,-N000000000000000`,
        },
        status: 200,
        data: undefined,
      });
    });
    const successful = await service.login('username', 'password');
    expect(successful).toBeTruthy();
    const session = service.getSession();
    expect(session).toBeTruthy();
    expect(session?.key).toBe(sessionKey);
  });

  it('should not log in successfully', async () => {
    nativeHttpServiceSpy.request.and.callFake(() => {
      return Promise.resolve<HttpResponse>({
        url: '',
        headers: {
          refresh: '0; URL=/scripts/mgrqispi.dll',
        },
        status: 200,
        data: undefined,
      });
    });
    const successful = await service.login('username', 'password');
    expect(successful).toBeFalse();
    const session = service.getSession();
    expect(session).toBeFalsy();
  });

  it('should log out successfully', async () => {
    nativeHttpServiceSpy.request.and.callFake(() => Promise.resolve({} as HttpResponse));
    await service.logout();
    const session = service.getSession();
    expect(session).toBeNull();
  });
});
