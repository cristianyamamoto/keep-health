import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { dietGuard } from './diet.guard';

describe('dietGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => dietGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
