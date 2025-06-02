import { Injectable, signal } from '@angular/core';
import { theme } from './echarts-theme';
import * as echarts from 'echarts';

@Injectable({
  providedIn: 'root'
})
export class EChartThemeService {
  readonly theme = signal<'light' | 'dark'>('light');

  setTheme(theme: 'light' | 'dark') {
    this.theme.set(theme);
  }

  toggleTheme() {
    this.theme.update(t => (t === 'light' ? 'dark' : 'light'));
  }
}
