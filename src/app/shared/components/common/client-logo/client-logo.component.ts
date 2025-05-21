import { Component, inject, ViewEncapsulation } from '@angular/core';
import { ThemeService } from '../../../../core/services/theme.service';
import { COMMON_IMPORTS } from '../../../helpers/common-imports';

@Component({
  selector: 'client-logo, app-client-logo',
  imports: [COMMON_IMPORTS],
  templateUrl: './client-logo.component.html',
  styleUrl: './client-logo.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'client-logo'
  }
})
export class ClientLogoComponent {
  public clientLogoPath = '/assets/client/';
  public readonly themeService = inject(ThemeService);
}
