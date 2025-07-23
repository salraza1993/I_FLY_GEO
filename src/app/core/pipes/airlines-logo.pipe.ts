import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'airlineLogo',
  standalone: true
})
export class AirlinesLogoPipe implements PipeTransform {

  private readonly BASE_URL = 'https://www.gstatic.com/flights/airline_logos';
  private readonly FALLBACK_IMAGE = 'assets/images/airlines/default.png';

  transform(
    airlineCode: string | null | undefined,
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
    if (theme === 'dark') {
      return `${this.BASE_URL}/${size}/dark/${cleanCode}.png`;
    }

    return `${this.BASE_URL}/${size}/${cleanCode}.png`;
  }
}
