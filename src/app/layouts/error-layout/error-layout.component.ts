import { Component } from '@angular/core';

@Component({
  selector: 'error-layout',
  imports: [],
  template: `
    <div class="error-page-wrapper"><ng-content /></div>
  `,
  styleUrl: './error-layout.component.css',
  host: {
    '[class.error-page-layout]': 'true'
  }
})
export class ErrorLayoutComponent {

}
