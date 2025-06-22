import { Component, inject, OnInit, signal } from '@angular/core';
import { COMMON_IMPORTS } from '../../helpers/common-imports';
import { LanguageDirectionPipe } from '../../../core/pipes/direction.pipe';
import { LanguageService } from '../../services/language.service';
import { FormsModule } from '@angular/forms';
import { ThemeMode, ThemeService } from '../../services/theme.service';

export interface ThemeListTypes {
  label: string,
  id: ThemeMode,
  icon: string,
  selected: boolean
}
@Component({
  selector: 'theme-mode-changer',
  imports: [COMMON_IMPORTS, FormsModule],
  templateUrl: './theme-mode-changer.component.html',
  styleUrl: './theme-mode-changer.component.css',
  host: {
    'class': 'theme-mode-changer-wrapper'
  }
})
export class ThemeModeChangerComponent implements OnInit {
  public readonly languageService = inject(LanguageService);
  private readonly themeService = inject(ThemeService);
  public readonly selectedThemeMode = this.themeService.themeModeSignal;
  public readonly themeSelectionList = signal<ThemeListTypes[]>([
    { label: "Auto", id: "auto", icon: "fa-desktop", selected: true },
    { label: "Dark Mode", id: "dark", icon: "fa-moon-stars", selected: false },
    { label: "Light Mode", id: "light", icon: "fa-sun-bright", selected: false }
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

}
