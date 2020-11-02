import { ChangeDetectorRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, DialogService } from '@app/core';
import { IonicModule } from '@ionic/angular';
import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let element: HTMLElement;
  let dialogServiceSpy: jasmine.SpyObj<DialogService>;
  let authenticationServiceSpy: jasmine.SpyObj<AuthenticationService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let cdrSpy: jasmine.SpyObj<ChangeDetectorRef>;

  beforeEach(async(() => {
    dialogServiceSpy = jasmine.createSpyObj('DialogService', ['showErrorAlert', 'showLoading']);
    authenticationServiceSpy = jasmine.createSpyObj('AuthenticationService', ['login']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    cdrSpy = jasmine.createSpyObj('ChangeDetectorRef', ['markForCheck']);

    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [IonicModule.forRoot(), ReactiveFormsModule],
      providers: [
        { provide: ChangeDetectorRef, useValue: cdrSpy },
        { provide: DialogService, useValue: dialogServiceSpy },
        { provide: AuthenticationService, useValue: authenticationServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  }));

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
