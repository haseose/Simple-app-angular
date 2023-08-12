
import { TestBed, async, inject } from '@angular/core/testing';
import { OrderService } from './order.service';

describe('Service: Case', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderService]
    });
  });

  it('should ...', inject([OrderService], (service: OrderService) => {
    expect(service).toBeTruthy();
  }));
});
