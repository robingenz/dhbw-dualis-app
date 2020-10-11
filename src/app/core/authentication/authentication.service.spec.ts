import { TestBed } from '@angular/core/testing';
import { NativeHttpService } from '../services';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let nativeHttpServiceSpy;

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
});
