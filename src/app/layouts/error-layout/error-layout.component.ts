import { Component } from '@angular/core';

@Component({
  selector: 'error-layout',
  imports: [],
  templateUrl: './error-layout.component.html',
  styleUrl: './error-layout.component.scss',
  host: {
    '[class.error-page-layout]': 'true'
  }
})
export class ErrorLayoutComponent {

}
