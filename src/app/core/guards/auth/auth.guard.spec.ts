import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core/authentication';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authServiceSpy: jasmine.SpyObj<AuthenticationService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthenticationService', ['getSession']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthenticationService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should not activate the route', async () => {
    authServiceSpy.getSession.and.returnValue(null);
    const canActivate = guard.canActivate();
    expect(canActivate).toBeFalsy();
  });

  it('should activate the route', async () => {
    authServiceSpy.getSession.and.returnValue({ key: '123', expirationTimestamp: 123 });
    const canActivate = guard.canActivate();
    expect(canActivate).toBeTruthy();
  });
});
