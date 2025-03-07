import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'client-logo',
  imports: [],
  templateUrl: './client-logo.component.html',
  styleUrl: './client-logo.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ClientLogoComponent {
  public clientLogoPath = '/assets/client/';
}
