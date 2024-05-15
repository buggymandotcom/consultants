import { TestBed } from '@angular/core/testing';

import { ClientCompanyHelpService } from './client-company-help.service';

describe('HelpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientCompanyHelpService = TestBed.get(ClientCompanyHelpService);
    expect(service).toBeTruthy();
  });
});
