import { effect, inject, Injectable, signal, DOCUMENT } from '@angular/core';

import { LocalStorageService } from '../../shared/services/localStorage.service';

export type ThemeMode = 'light' | 'dark' | 'auto';
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private document = inject(DOCUMENT);
  private rootElement: HTMLElement = this.document.documentElement;
  private localStorage = inject(LocalStorageService);
  private DEFAULT_MODE: ThemeMode = 'auto';
  private _themeMode = signal<ThemeMode>(this.getStoredTheme());

  constructor() {
    this.applyTheme(this._themeMode());
    this.autoModeReactivity()
    effect(() => {
      this.applyTheme(this._themeMode());
    });
  }

  private getStoredTheme(): ThemeMode {
    return (this.localStorage.getInnerItem('appSettings', 'preferences')?.appearanceMode || this.DEFAULT_MODE) as ThemeMode;
  }

  public setThemeMode(mode: ThemeMode): void {
    this._themeMode.set(mode);
    const currentPreferences = this.localStorage.getInnerItem('appSettings', 'preferences');
    const updatedPreferences = { ...currentPreferences, appearanceMode: mode };
    this.localStorage.setInnerItem('appSettings', 'preferences', updatedPreferences);
  }

  public get themeModeSignal() {
    return this._themeMode;
  }


  private applyTheme(mode: ThemeMode): void {
    this.rootElement.classList.remove('light', 'dark');
    this.rootElement.removeAttribute('data-theme');

    let finalMode = mode;
    if (mode === 'auto') {
      finalMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    this.rootElement.classList.add(finalMode);
    this.rootElement.setAttribute('data-theme', finalMode);
  }
  private autoModeReactivity() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (this._themeMode() === 'auto') {
        this.applyTheme('auto');
      }
    });
  }
}
