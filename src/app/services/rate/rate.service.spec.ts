
import { TestBed, async, inject } from '@angular/core/testing';
import { RateService } from './rate.service';

describe('Service: Case', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RateService]
    });
  });

  it('should ...', inject([RateService], (service: RateService) => {
    expect(service).toBeTruthy();
  }));
});
