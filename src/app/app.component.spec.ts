import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Plugins, SplashScreenPlugin, StatusBarPlugin, StatusBarStyle } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { createPlatformSpy } from '@tests/spies';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  let originalSplashScreen: SplashScreenPlugin;
  let originalStatusBar: StatusBarPlugin;
  let platformSpy: jasmine.SpyObj<Platform>;

  beforeEach(async(() => {
    originalSplashScreen = Plugins.SplashScreen;
    originalStatusBar = Plugins.StatusBar;
    Plugins.StatusBar = jasmine.createSpyObj('StatusBarPlugin', ['setOverlaysWebView', 'setStyle']);
    Plugins.SplashScreen = jasmine.createSpyObj('SplashScreenPlugin', ['hide']);

    platformSpy = createPlatformSpy();

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: Platform, useValue: platformSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  afterEach(() => {
    Plugins.StatusBar = originalStatusBar;
    Plugins.SplashScreen = originalSplashScreen;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the app', () => {
    expect(platformSpy.ready).toHaveBeenCalled();
  });

  it('should hide the splash screen', () => {
    expect(platformSpy.ready).toHaveBeenCalled();
    expect(Plugins.SplashScreen.hide).toHaveBeenCalledTimes(1);
  });

  it('should configure the status bar for android', fakeAsync(() => {
    platformSpy.is.withArgs('android').and.returnValue(true);
    TestBed.createComponent(AppComponent);
    tick();
    expect(Plugins.StatusBar.setStyle).toHaveBeenCalledWith({ style: StatusBarStyle.Dark });
    expect(Plugins.StatusBar.setOverlaysWebView).toHaveBeenCalledWith({ overlay: false });
  }));

  it('should configure the status bar for ios', fakeAsync(() => {
    platformSpy.is.withArgs('ios').and.returnValue(true);
    TestBed.createComponent(AppComponent);
    tick();
    expect(Plugins.StatusBar.setStyle).toHaveBeenCalledWith({ style: StatusBarStyle.Light });
  }));
});
