import { Component } from '@angular/core';
import { ClientLogoComponent } from "../../client-logo/client-logo.component";

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
}
