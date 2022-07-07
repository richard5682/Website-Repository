/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FetchService } from './fetch.service';

describe('Service: Fetch', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FetchService]
    });
  });

  it('should ...', inject([FetchService], (service: FetchService) => {
    expect(service).toBeTruthy();
  }));
});
