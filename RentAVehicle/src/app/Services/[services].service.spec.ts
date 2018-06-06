import { TestBed, inject } from '@angular/core/testing';

import { [services]Service } from './[services].service';

describe('[services]Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [[services]Service]
    });
  });

  it('should be created', inject([[services]Service], (service: [services]Service) => {
    expect(service).toBeTruthy();
  }));
});
