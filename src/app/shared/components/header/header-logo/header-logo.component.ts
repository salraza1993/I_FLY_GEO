import { ThemeService } from '@/shared/services/theme.service';
import { Component, inject } from '@angular/core';

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
  // not-in-use
}
