import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'airlineLogo',
  standalone: true
})
export class AirlinesLogoPipe implements PipeTransform {

  private readonly GSTATIC_BASE = 'https://www.gstatic.com/flights/airline_logos';
  private readonly DUFFEL_BASE_URL = 'https://assets.duffel.com/img/airlines/for-light-background';
  private readonly FALLBACK_IMAGE = 'https://www.gstatic.com/flights/airline_logos/70px/X1.png';
  // private readonly DUFFEL_LOGO_URL = 'https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/AI.svg';
  // private readonly DUFFEL_LOCKUP_URL = 'https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/AI.svg';

  transform(
    airlineCode: string | null | undefined,
    source: 'gstatic' | 'duffel' = 'gstatic',
    type: 'logo' | 'lockup' = 'logo',
    size: '70px' | '64px' | '32px' = '70px',
    theme: 'light' | 'dark' = 'light',
    fallback?: string
  ): string {

    if (!airlineCode || typeof airlineCode !== 'string') {
      return fallback || this.FALLBACK_IMAGE;
    }

    // Clean and format the airline code
    const cleanCode = airlineCode.trim().toUpperCase();

    if (cleanCode.length === 0) {
      return fallback || this.FALLBACK_IMAGE;
    }

    // Generate URL based on theme
    if(source === 'duffel') {
      if (type === 'lockup') {
        return `${this.DUFFEL_BASE_URL}/full-color-lockup/${cleanCode}.svg`;
      } else return `${this.DUFFEL_BASE_URL}/full-color-logo/${cleanCode}.svg`;
    } else {
      if (theme === 'dark') {
        return `${this.GSTATIC_BASE}/${size}/dark/${cleanCode}.png`;
      }
      return `${this.GSTATIC_BASE}/${size}/${cleanCode}.png`;
    }
  }
}
