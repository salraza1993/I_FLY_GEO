import { Component, Input, inject, signal, computed } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { EChartsService } from './echarts.service';
import { COMMON_IMPORTS } from '../../shared/helpers/common-imports';

export interface LineChartData {
  categories: string[];
  values: number[];
}

@Component({
  standalone: true,
  selector: 'line-chart',
  imports: [NgxEchartsModule, COMMON_IMPORTS],
  template: `
    <div echarts
         [options]="options()"
         [theme]="theme()"
         class="e-chart-container">
    </div>
  `,
  styles: [`
    .e-chart-container {
      width: 100%;
      height: 400px;
    }
  `]
})
export class LineChartComponent {
  private readonly eChartsService = inject(EChartsService);
  readonly theme = this.eChartsService.theme;

  private dataSignal = signal<LineChartData>({ categories: [], values: [] });

  @Input() set data(value: LineChartData) {
    this.dataSignal.set(value);
  }

  readonly options = computed(() => {
    const data = this.dataSignal();
    return {
      title: { text: 'Line Chart' },
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: data.categories },
      yAxis: { type: 'value' },
      series: [
        {
          data: data.values,
          type: 'line',
          smooth: true,
        }
      ]
    };
  });
}
