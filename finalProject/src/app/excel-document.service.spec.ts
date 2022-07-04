import { TestBed } from '@angular/core/testing';

import { ExcelDocumentService } from './excel-document.service';

describe('ExcelDocumentService', () => {
  let service: ExcelDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
