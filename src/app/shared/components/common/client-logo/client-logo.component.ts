import { Component, inject, input, OnInit, signal } from '@angular/core';
import { COMMON_IMPORTS } from '../../../helpers/common-imports';
import { LocalStorageService } from '../../../services/localStorage.service';
import { BrandingDataTypes } from '../../../../types/appSettingInterface';
import { ThemeService } from '../../../services/theme.service';


type LogoDataTypes = { light: string; dark: string };

@Component({
  selector: 'client-logo, app-client-logo',
  imports: [COMMON_IMPORTS],
  templateUrl: './client-logo.component.html',
  styleUrl: './client-logo.component.css',
  host: {
    'class': 'client-logo'
  }
})
export class ClientLogoComponent implements OnInit {
  private ClientLogoFallback: LogoDataTypes = {
    dark: "assets/client/logo-dark_fallback.svg",
    light: "assets/client/logo-light_fallback.svg"
  };
  

  public readonly themeService = inject(ThemeService);
  public readonly localStorage = inject(LocalStorageService);
  public readonly setClassOnPictureTag = input<string>();
  private brandingDataFromLocalStorage = signal<BrandingDataTypes | undefined>(undefined);
  public clientLogoPath = signal<LogoDataTypes>(this.ClientLogoFallback);

  ngOnInit(): void {
    this.brandingDataFromLocalStorage.set(this.localStorage.getInnerItem('appSettings', 'branding'));
    this.clientLogoPath.set(
      this.brandingDataFromLocalStorage()?.logos ?? this.ClientLogoFallback
    );
  }
}