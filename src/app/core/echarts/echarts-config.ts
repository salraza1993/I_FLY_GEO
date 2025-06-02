// shared/charts/echarts-config.ts
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DatasetComponent,
  ToolboxComponent,
} from 'echarts/components';
import {
  LineChart,
  BarChart,
  PieChart,
} from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DatasetComponent,
  ToolboxComponent,
  LineChart,
  BarChart,
  PieChart,
  CanvasRenderer,
]);

export { echarts };
