import { TestBed, inject } from '@angular/core/testing';

import { SchoolSettingsService } from './school-settings.service';

describe('SchoolSettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SchoolSettingsService]
    });
  });

  it('should be created', inject([SchoolSettingsService], (service: SchoolSettingsService) => {
    expect(service).toBeTruthy();
  }));
});
