// shared/charts/bar-chart.component.ts
import { Component, Input, computed, inject, signal } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { EChartsService } from './echarts.service';
import { COMMON_IMPORTS } from '../../shared/helpers/common-imports';

@Component({
  selector: 'pie-chart',
  imports: [NgxEchartsModule, COMMON_IMPORTS],
  template: `<div echarts [options]="options" [theme]="theme()" class="e-chart-container"></div>`,
  styles: [`.e-chart-container {width: 100%; height: 400px;}`]
})
export class PieChartComponent {
  private readonly EChartsService = inject(EChartsService);
  readonly theme = this.EChartsService.theme;
  public options: any;
  public optionSignal = signal<any | undefined>(undefined);

  @Input() set data(inputData: { categories: string[]; values: number[] }) {
    this.options = {
      title: { text: 'Bar Chart' },
      tooltip: {},
      xAxis: { data: inputData.categories },
      yAxis: {},
      series: [{ type: 'bar', data: inputData.values }]
    };
  }
  constructor() {
    this.optionSignal.set(this.options)
  }
}
