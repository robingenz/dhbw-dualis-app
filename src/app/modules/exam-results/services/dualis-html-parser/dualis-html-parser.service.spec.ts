import { TestBed } from '@angular/core/testing';

import { DualisHtmlParserService } from './dualis-html-parser.service';

describe('DualisHtmlParserService', () => {
  let service: DualisHtmlParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DualisHtmlParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
