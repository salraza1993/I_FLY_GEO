import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../../../core/services/theme.service';

@Component({
  selector: 'header-logo',
  imports: [],
  templateUrl: './header-logo.component.html',
  styleUrl: './header-logo.component.css',
  host: {
    class: 'client-logo'
  }
})
export class HeaderLogoComponent {
  public clientLogoPath = '/assets/client/';
  public readonly themeService = inject(ThemeService);
}
