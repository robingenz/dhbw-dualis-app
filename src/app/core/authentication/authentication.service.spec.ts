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
    nativeHttpServiceSpy.request.and.callFake(() => {
      return Promise.resolve<HttpResponse>({
        data: '',
        headers: {
          refresh: `0; URL=/scripts/mgrqispi.dll?APPNAME=CampusNet&PRGNAME=STARTPAGE_DISPATCH&ARGUMENTS=-N111222333444555,-N000311,-N000000000000000`,
        },
        status: 200,
      });
    });
    const successful = await service.login('username', 'password');
    expect(successful).toBeTruthy();
  });

  it('should not log in successfully', async () => {
    nativeHttpServiceSpy.request.and.callFake(() => {
      return Promise.resolve<HttpResponse>({
        data: '',
        headers: {},
        status: 200,
      });
    });
    const successful = await service.login('username', 'password');
    expect(successful).toBeFalse();
  });

  it('should set the correct session key', async () => {
    const sessionKey = '-N111222333444555';
    nativeHttpServiceSpy.request.and.callFake(() => {
      return Promise.resolve({
        data: '',
        headers: {
          refresh: `0; URL=/scripts/mgrqispi.dll?APPNAME=CampusNet&PRGNAME=STARTPAGE_DISPATCH&ARGUMENTS=${sessionKey},-N000311,-N000000000000000`,
        },
        status: 200,
      });
    });
    await service.login('username', 'password');
    const session = service.getSession();
    expect(session?.key).toBe(sessionKey);
  });

  it('should clear the session', async () => {
    nativeHttpServiceSpy.request.and.callFake(() => Promise.resolve({} as HttpResponse));
    await service.logout();
    const session = service.getSession();
    expect(session).toBeNull();
  });
});