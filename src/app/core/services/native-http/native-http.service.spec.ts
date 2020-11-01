import { TestBed } from '@angular/core/testing';

import { NativeHttpService } from './native-http.service';

describe('NativeHttpService', () => {
  let service: NativeHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NativeHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
