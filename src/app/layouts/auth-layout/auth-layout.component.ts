import { Component, ViewEncapsulation } from '@angular/core';
import { LoginCarouselComponent } from "../../shared/components/login-carousel/login-carousel.component";

@Component({
  selector: 'auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom,
  host: {
    '[class.auth-layout]': 'true'
  },
  imports: [LoginCarouselComponent]
})
export class AuthLayoutComponent {}
