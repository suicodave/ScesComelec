import { TestBed, inject } from '@angular/core/testing';

import { PartylistService } from './partylist.service';

describe('PartylistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PartylistService]
    });
  });

  it('should be created', inject([PartylistService], (service: PartylistService) => {
    expect(service).toBeTruthy();
  }));
});
