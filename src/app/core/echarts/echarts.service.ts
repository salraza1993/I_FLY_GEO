import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EChartsService {
  // Signal-based state management
  readonly theme = signal<'light' | 'dark'>('light');

  readonly chartOptions = signal<any>({});
  readonly chartTheme = signal<'default' | 'dark'>('default');

  setOptions(options: any) {
    this.chartOptions.set(options);
  }

  setTheme(theme: 'light' | 'dark') {
    this.theme.set(theme);
  }

  toggleTheme() {
    this.theme.update(t => (t === 'light' ? 'dark' : 'light'));
  }
}
