
import { TestBed, async, inject } from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('Service: Case', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService]
    });
  });

  it('should ...', inject([LoadingService], (service: LoadingService) => {
    expect(service).toBeTruthy();
  }));
});
