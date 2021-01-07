import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthenticationService, DialogService } from '@app/core';
import { SharedTestingModule } from '@tests/modules';
import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let element: HTMLElement;
  let dialogServiceSpy: jasmine.SpyObj<DialogService>;
  let authenticationServiceSpy: jasmine.SpyObj<AuthenticationService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(
    waitForAsync(() => {
      dialogServiceSpy = jasmine.createSpyObj('DialogService', ['showErrorAlert', 'showLoading']);
      authenticationServiceSpy = jasmine.createSpyObj('AuthenticationService', ['login']);
      routerSpy = jasmine.createSpyObj('Router', ['navigate']);

      TestBed.configureTestingModule({
        declarations: [LoginPage],
        imports: [SharedTestingModule],
        providers: [
          { provide: DialogService, useValue: dialogServiceSpy },
          { provide: AuthenticationService, useValue: authenticationServiceSpy },
          { provide: Router, useValue: routerSpy },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(LoginPage);
      component = fixture.componentInstance;
      element = fixture.nativeElement;
      fixture.detectChanges();
    }),
  );

  afterEach(() => {
    fixture.nativeElement.remove();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be a valid input', () => {
    component.loginFormGroup.setValue({
      username: 'username',
      password: 'password',
    });
    expect(component.loginFormGroup.valid).toBeTruthy();
  });

  it('should be an invalid input', () => {
    component.loginFormGroup.setValue({
      username: '',
      password: '',
    });
    expect(component.loginFormGroup.valid).toBeFalsy();
    component.loginFormGroup.setValue({
      username: 'username',
      password: '',
    });
    expect(component.loginFormGroup.valid).toBeFalsy();
    component.loginFormGroup.setValue({
      username: '',
      password: 'password',
    });
    expect(component.loginFormGroup.valid).toBeFalsy();
  });
});
