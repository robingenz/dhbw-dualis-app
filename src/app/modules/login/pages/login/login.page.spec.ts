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
  let dialogServiceSpy, authenticationServiceSpy, routerSpy;

  beforeEach(async(() => {
    dialogServiceSpy = jasmine.createSpyObj('DialogService', ['showErrorAlert', 'showLoading']);
    authenticationServiceSpy = jasmine.createSpyObj('AuthenticationService', ['login']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [IonicModule.forRoot(), ReactiveFormsModule],
      providers: [
        ChangeDetectorRef,
        { provide: DialogService, useValue: dialogServiceSpy },
        AuthenticationService,
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
