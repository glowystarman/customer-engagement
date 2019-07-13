import { TestBed } from '@angular/core/testing';

import { EngagementService } from './engagement.service';

describe('EngagementService', () => {
  
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EngagementService = TestBed.get(EngagementService);
    expect(service).toBeTruthy();
  });

  it('should be Email', () => {
    const service: EngagementService = TestBed.get(EngagementService);
    expect(service.getEngagementType({sunny: false, raining: false, degreesFahrenheit: 70})).toBe('Email');
  });

  it('should be Text', () => {
    const service: EngagementService = TestBed.get(EngagementService);
    expect(service.getEngagementType({sunny: true, raining: false, degreesFahrenheit: 80})).toBe('Text');
  });

  it('should be Phone', () => {
    const service: EngagementService = TestBed.get(EngagementService);
    expect(service.getEngagementType({sunny: false, raining: true, degreesFahrenheit: 70})).toBe('Phone');
  });
});
