import { Component, inject, OnInit, signal } from '@angular/core';
import { COMMON_IMPORTS } from '../../../shared/helpers/common-imports';
import { ThemeListTypes } from '../../../shared/components/theme-mode-changer/theme-mode-changer.component';
import { LanguageService } from '../../../shared/services/language.service';
import { ClickOutsideDirective } from '../../../core/directives/click-outside.directive';
import { ThemeMode, ThemeService } from '../../../shared/services/theme.service';

@Component({
  selector: 'basic-setting-on-auth',
  imports: [COMMON_IMPORTS, ClickOutsideDirective],
  templateUrl: './basic-setting-on-auth.component.html',
  styleUrl: './basic-setting-on-auth.component.css',
  host: {
    'class': 'basic-setting-on-auth-wrapper'
  }
})
export class BasicSettingOnAuthComponent implements OnInit {
  public readonly languageService = inject(LanguageService)
  private readonly themeService = inject(ThemeService);
  public readonly selectedThemeMode = this.themeService.themeModeSignal;
  public showDataListSignal = signal<boolean>(false);
  public currentLang = this.languageService.currentLangSignal;

  public changeLanguage(language: string): void {
    this.languageService.changeLanguage(language);
  }
  public readonly themeSelectionList = signal<ThemeListTypes[]>([
    { label: "Auto", id: "auto", icon: "fa-desktop", selected: true },
    { label: "Dark", id: "dark", icon: "fa-moon-stars", selected: false },
    { label: "Light", id: "light", icon: "fa-sun-bright", selected: false }
  ]);
  private setSelectedModeHandler(mode: ThemeMode) {
    this.themeSelectionList.update((items) =>
      items.map(item => ({ ...item, selected: item.id === mode }))
    );
  }

  ngOnInit(): void {
    this.setSelectedModeHandler(this.selectedThemeMode())
  }

  public changeTheme(mode: ThemeMode): void {
    this.themeService.setThemeMode(mode);
    this.setSelectedModeHandler(mode);
  }
  public showSettingList(event: boolean): void {
    this.showDataListSignal.update(value => event);
  }
}
