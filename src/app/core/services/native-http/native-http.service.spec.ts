import { TestBed } from '@angular/core/testing';
import { HTTP } from '@ionic-native/http/ngx';
import { NativeHttpService } from './native-http.service';

describe('NativeHttpService', () => {
  let service: NativeHttpService;
  let httpSpy: jasmine.SpyObj<HTTP>;

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HTTP', ['setRequestTimeout', 'sendRequest', 'ErrorCode']);
    TestBed.configureTestingModule({
      providers: [{ provide: HTTP, useValue: httpSpy }],
    });
    service = TestBed.inject(NativeHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
