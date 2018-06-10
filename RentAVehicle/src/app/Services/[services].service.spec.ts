import { TestBed, inject } from '@angular/core/testing';

import { ServiceManager } from './[services].service';

describe('[services]Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceManager]
    });
  });

  it('should be created', inject([ServiceManager], (service: ServiceManager) => {
    expect(service).toBeTruthy();
  }));
});
