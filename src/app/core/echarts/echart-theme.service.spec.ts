import { TestBed } from '@angular/core/testing';

import { EChartThemeService } from './echart-theme.service';

describe('EChartThemeService', () => {
  let service: EChartThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EChartThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
